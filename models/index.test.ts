import { expect } from "jsr:@std/expect";
import { PostSchema } from "./index.ts";

// =============================================================================
// Valid Post
// =============================================================================

const validPost = {
  slug: "test-post",
  title: "Test Post Title",
  tags: ["typescript", "deno"],
  content: "# Hello World\n\nThis is content.",
  snippet: "A short description of the post",
  publishedAt: 1718459525256,
};

Deno.test("PostSchema - accepts valid post with all required fields", () => {
  const result = PostSchema.safeParse(validPost);

  expect(result.success).toBe(true);
});

Deno.test("PostSchema - accepts post with empty tags array", () => {
  const result = PostSchema.safeParse({ ...validPost, tags: [] });

  expect(result.success).toBe(true);
});

// =============================================================================
// Required Fields
// =============================================================================

Deno.test("PostSchema - rejects post with empty slug", () => {
  const result = PostSchema.safeParse({ ...validPost, slug: "" });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with missing slug", () => {
  const { slug: _, ...postWithoutSlug } = validPost;
  const result = PostSchema.safeParse(postWithoutSlug);

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with empty title", () => {
  const result = PostSchema.safeParse({ ...validPost, title: "" });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with empty content", () => {
  const result = PostSchema.safeParse({ ...validPost, content: "" });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with empty snippet", () => {
  const result = PostSchema.safeParse({ ...validPost, snippet: "" });

  expect(result.success).toBe(false);
});

// =============================================================================
// publishedAt Validation
// =============================================================================

Deno.test("PostSchema - rejects post with negative publishedAt", () => {
  const result = PostSchema.safeParse({ ...validPost, publishedAt: -1 });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with zero publishedAt", () => {
  const result = PostSchema.safeParse({ ...validPost, publishedAt: 0 });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with non-integer publishedAt", () => {
  const result = PostSchema.safeParse({ ...validPost, publishedAt: 123.456 });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with string publishedAt", () => {
  const result = PostSchema.safeParse({
    ...validPost,
    publishedAt: "2024-06-15",
  });

  expect(result.success).toBe(false);
});

// =============================================================================
// Tags Validation
// =============================================================================

Deno.test("PostSchema - rejects post with non-array tags", () => {
  const result = PostSchema.safeParse({
    ...validPost,
    tags: "typescript, deno",
  });

  expect(result.success).toBe(false);
});

Deno.test("PostSchema - rejects post with non-string tag elements", () => {
  const result = PostSchema.safeParse({ ...validPost, tags: [1, 2, 3] });

  expect(result.success).toBe(false);
});
