# gmaltez.dev - Development Guidelines

## 1. Project Overview

Personal blog and portfolio site built with Deno Fresh. Simple, fast, maintainable.

**Tech Stack:**
- Deno + Fresh (file-based routing, islands architecture)
- Preact + TypeScript
- Tailwind CSS v4 (dark theme only)
- Zod for validation
- PrismJS for syntax highlighting
- Markdown files as content source (no database)

---

## 2. TypeScript Strict Mode

### Rules
- **No `any`** - use `unknown` and narrow with type guards
- **No type assertions** (`as SomeType`) without explicit justification in a comment
- **No `@ts-ignore`/`@ts-expect-error`** without explanation
- **Prefer `type` over `interface`** for all type definitions
- **Never use `enum`** - always use union types
- **No `eval`** - security risk
- **No non-null assertions** (`!`) - handle null/undefined properly

### Examples

```typescript
// Bad: enum
enum Status { Draft, Published }

// Good: union type
type Status = 'draft' | 'published'
```

```typescript
// Bad: any
function processData(data: any) { return data.value }

// Good: unknown with narrowing
function processData(data: unknown): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid data')
  }
  if (!('value' in data) || typeof data.value !== 'string') {
    throw new Error('Missing value')
  }
  return data.value
}
```

---

## 3. Code Structure & Functional Style

### Rules
- **Immutable data in functions** - never mutate inputs
- **Pure functions** wherever possible
- **Composition over inheritance**
- **Prefer imperative loops** over array methods (map, filter, reduce)
- **No nested if/else** - use early returns and guard clauses
- **Max 2 levels of nesting**
- **Small, single-responsibility functions**
- **Prefer `function foo()`** over `const foo = () =>`
- **Classes only for singletons/managers**

### Examples

```typescript
// Bad: nested conditionals
function validatePost(post: Post): Result {
  if (post.title) {
    if (post.content) {
      if (post.slug) {
        return { valid: true }
      }
    }
  }
  return { valid: false }
}

// Good: early returns
function validatePost(post: Post): Result {
  if (!post.title) return { valid: false, error: 'Missing title' }
  if (!post.content) return { valid: false, error: 'Missing content' }
  if (!post.slug) return { valid: false, error: 'Missing slug' }
  return { valid: true }
}
```

---

## 4. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Functions | camelCase, verb-based | `getEstimatedReadingTime`, `extractMetadata` |
| Types | PascalCase | `Post`, `HeadProps` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_READING_SPEED` |
| Files | kebab-case | `post-preview.tsx` |
| Routes | lowercase | `blog/[slug].tsx` |
| Components | PascalCase | `PostPreview.tsx`, `Tag.tsx` |
| Islands | PascalCase | `ProgressBar.tsx` |
| Test files | *.test.ts | `markdown.test.ts` |

---

## 5. Function Parameters

### Rules
- **Options objects** for 2+ parameters or any optional parameters
- **Destructure at function start** with sensible defaults
- **Single-parameter pure functions** can use positional parameters

### Example

```typescript
// Bad: many positional parameters
function createPost(title: string, slug: string, content: string, tags?: string[]) { }

// Good: options object
type CreatePostOptions = {
  title: string
  slug: string
  content: string
  tags?: string[]
}

function createPost(options: CreatePostOptions) {
  const { title, slug, content, tags = [] } = options
}
```

---

## 6. Comments & Documentation

### Rules
- **Code should be self-documenting** through clear naming
- **Comments only when logic isn't self-evident**
- **External API integrations MUST have usage comments**

### Example

```typescript
// Bad: obvious comment
// Get post by slug
function getPostBySlug(slug: string) { }

// Good: explains non-obvious behavior
// Markdown code blocks use placeholder tokens during parsing to preserve formatting
function preProcessCodeBlocks(text: string) { }
```

---

## 7. Imports & Exports

### Rules
- **Named exports only** - never use default exports (except Fresh route pages)
- **Use import aliases** from deno.json (`@utils`, `@models`, `@database`, `@components`)
- **Operators at beginning of line** for multi-line conditions

### Import Aliases (from deno.json)
```typescript
import { Post } from "@models"
import { Database } from "@database"
import { Head, Tag } from "@components"
import { getEstimatedReadingTime } from "@utils"
```

### Examples

```typescript
// Bad: default export (except routes)
export default function Tag() { }

// Good: named export
export function Tag() { }

// Bad: operators at end
const isValid = hasTitle &&
  hasContent &&
  hasSlug

// Good: operators at beginning
const isValid = hasTitle
  && hasContent
  && hasSlug
```

---

## 8. Preact Component Standards

### File Structure
```
components/
├── ComponentName.tsx   # Component implementation
└── index.ts            # Barrel exports
```

### Rules
- **Use `type Props` with `Readonly<Props>`**
- **Components are pure** - derive state from props
- **Use Tailwind classes only** - no inline styles
- **Dark theme only** - no light mode
- **Mobile-first responsive design**
- **Multi-line props** - break props into multiple lines unless only one prop

### JSX Props Formatting

```tsx
// Bad: multiple props on single line
<Tag key={tag} tag={tag} variant="primary" />

// Good: one prop per line
<Tag
  key={tag}
  tag={tag}
  variant="primary"
/>

// Good: single prop can stay on one line
<Tag tag={tag} />
```

### Example

```tsx
// components/PostPreview.tsx
import { Post } from "@models"
import { getEstimatedReadingTime } from "@utils"
import { Tag } from "./Tag.tsx"

type Props = Readonly<{
  post: Post
}>

export function PostPreview({ post }: Props) {
  return (
    <article class="bg-background-secondary rounded-xl p-4">
      <h2 class="text-xl font-bold text-text-primary">
        {post.title}
      </h2>
      <p class="text-text-secondary">
        {post.snippet}
      </p>
      <div class="flex gap-2">
        {post.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
    </article>
  )
}
```

---

## 9. Fresh Islands

Islands are interactive components that hydrate on the client.

### Rules
- **Islands go in `/islands` directory**
- **Use islands sparingly** - only for interactivity
- **Prefer server-rendered components** when possible
- **Islands can use Preact signals** for reactive state

### Example

```tsx
// islands/ProgressBar.tsx
import { useEffect, useState } from "preact/hooks"

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Client-side logic here
  }, [])

  return (
    <div
      class="fixed top-0 left-0 h-1 bg-primary transition-all"
      style={{ width: `${progress}%` }}
    />
  )
}
```

---

## 10. Fresh Routes & Handlers

### Route Structure
```
routes/
├── _app.tsx           # App shell/layout
├── _error.tsx         # Error page
├── index.tsx          # Home page
├── about.tsx          # Static page
└── blog/
    └── [slug].tsx     # Dynamic route
```

### Handler Pattern

```typescript
// routes/blog/[slug].tsx
import { define } from "../../utils.ts"

export const handler = define.handlers({
  async GET(ctx) {
    const post = await Database.posts.getBySlug(ctx.params.slug)
    if (!post) return ctx.redirect("/404")
    return { data: { post } }
  },
})

export default define.page<typeof handler>(function PostPage(props) {
  const { post } = props.data
  return <article>{/* ... */}</article>
})
```

---

## 11. Styling

### Rules
- **Tailwind CSS only** - no inline styles, no CSS modules
- **Use CSS custom properties** from `@theme` for colors
- **Dark theme only** - all colors optimized for dark backgrounds

### Theme Variables (assets/styles.css)
```css
@theme {
  --color-background: #0d0d0d;
  --color-background-secondary: #141414;
  --color-background-tertiary: #1a1a1a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #d4d4d4;
  --color-text-tertiary: #737373;
  --color-primary: #0f9d58;
  --color-primary-hover: #0d8a4d;
  --color-secondary: #b8d4e3;
}
```

### Tailwind Usage

```tsx
// Use theme colors via Tailwind
<div class="bg-background text-text-primary">
<a class="text-primary hover:text-primary-hover">

// Use responsive prefixes
<h1 class="text-2xl sm:text-4xl">
```

---

## 12. Data Layer

### Blog Posts
Posts are markdown files in `/posts` with YAML front matter:

```markdown
---
title: Post Title
snippet: Short description for previews
tags: typescript, deno, fresh
published_at: 2024-12-10
---

# Content here
```

### Database Module

```typescript
// database/posts.ts
export const posts = {
  async getAll(): Promise<Post[]> { },
  async getBySlug(slug: string): Promise<Post | null> { },
}

// Usage
import { Database } from "@database"
const posts = await Database.posts.getAll()
```

---

## 13. Markdown Rendering

The custom markdown renderer (`utils/markdown.ts`) handles:
- **Headers** with anchor links
- **Code blocks** with PrismJS syntax highlighting
- **Lists** (ordered and unordered)
- **Links, bold, italic**
- **Sanitization** of dangerous HTML

### Supported Languages
jsx, typescript, tsx, diff, json, bash, yaml

### Adding New Languages
```typescript
// utils/markdown.ts
import "prismjs/components/prism-python.js"
```

---

## 14. Validation with Zod

### Rules
- **Zod schemas live in `models/` directory**
- **Always infer types from Zod:** `type Post = z.infer<typeof PostSchema>`
- **Validate all external data** (markdown front matter, URL params)

### Example

```typescript
// models/index.ts
import { z } from "zod"

export const PostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tags: z.array(z.string()),
  content: z.string().min(1),
  snippet: z.string().min(1),
  publishedAt: z.number().positive(),
})

export type Post = z.infer<typeof PostSchema>
```

---

## 15. Testing

### Test Structure
Use Deno's built-in test runner with `@std/expect` for assertions.

```typescript
// utils/markdown.test.ts
import { expect } from "jsr:@std/expect"
import { Markdown } from "./markdown.ts"

Deno.test("markdown - renders headers with anchor links", () => {
  const input = "# Hello World"
  const output = Markdown.render(input)

  expect(output).toContain('<h1 id="hello-world">')
  expect(output).toContain('href="#hello-world"')
})

Deno.test("markdown - highlights code blocks", () => {
  const input = "```typescript\nconst x = 1\n```"
  const output = Markdown.render(input)

  expect(output).toContain("<pre>")
  expect(output).toContain("line-number")
})
```

### Testing Routes (Fresh Pattern)

```typescript
// routes/blog/[slug].test.ts
import { expect } from "jsr:@std/expect"
import { App } from "fresh"
import { handler as blogHandler } from "./[slug].tsx"

Deno.test("blog route - returns 404 for missing post", async () => {
  const app = new App()
  app.get("/blog/:slug", blogHandler.GET)

  const res = await app.handle(new Request("http://localhost/blog/nonexistent"))
  expect(res.status).toBe(302)  // Redirect to 404
})
```

### What to Test
- **Pure utility functions** (markdown rendering, metadata extraction)
- **Route handlers** (data fetching, redirects)
- **Zod schema validation**

### What NOT to Test
- Simple components (test via E2E if needed)
- Tailwind styling
- Third-party library internals

### Running Tests
```bash
deno test                    # Run all tests
deno test utils/             # Run tests in directory
deno test --watch            # Watch mode
deno test --coverage         # With coverage
```

---

## 16. Commands

```bash
# Development
deno task dev         # Start dev server with Vite HMR
deno task build       # Production build
deno task start       # Serve production build

# Quality
deno task check       # Format + lint + type check
deno task fix-all     # Auto-fix formatting and lint issues
deno task pre-commit  # Full check + build (run before commits)

# Testing
deno test             # Run all tests
deno test --watch     # Watch mode
```

---

## 17. Project Structure

```
gmaltez.dev/
├── assets/
│   ├── styles.css        # Global theme + Tailwind
│   └── post.css          # Blog post styles
├── components/
│   ├── Head.tsx          # SEO meta tags
│   ├── PostPreview.tsx   # Post card component
│   ├── Tag.tsx           # Tag with dynamic color
│   └── index.ts          # Exports
├── database/
│   ├── posts.ts          # Post data access
│   └── index.ts          # Database module
├── islands/
│   ├── ProgressBar.tsx   # Page load indicator
│   ├── ExperienceTimeline.tsx
│   └── TechnicalExpertiseCarousel.tsx
├── models/
│   └── index.ts          # Zod schemas + types
├── posts/                # Markdown blog posts
├── routes/
│   ├── _app.tsx          # App layout
│   ├── _error.tsx        # 404 page
│   ├── index.tsx         # Home/posts list
│   ├── about.tsx
│   ├── experience.tsx
│   └── blog/[slug].tsx   # Blog post page
├── static/               # Public assets
├── utils/
│   ├── index.ts          # Metadata, reading time
│   └── markdown.ts       # Markdown renderer
├── client.ts             # Client CSS entry
├── main.ts               # Fresh app init
├── utils.ts              # Fresh define helper
├── deno.json             # Config, tasks, imports
├── tailwind.config.ts
└── vite.config.ts
```

---

## Quick Reference

### Do
- Use early returns
- Use options objects for multiple parameters
- Use named exports only
- Use union types instead of enums
- Use Tailwind only for styling
- Validate external data with Zod
- Keep functions small and focused
- Use import aliases (`@utils`, `@models`, etc.)

### Don't
- Use `any` type
- Use default exports (except route pages)
- Use `enum`
- Use inline styles or CSS modules
- Nest more than 2 levels deep
- Use arrow functions for named functions
- Use classes (except for singletons)
- Mutate function parameters
