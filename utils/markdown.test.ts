import { expect } from "jsr:@std/expect";
import { Markdown } from "./markdown.ts";

// =============================================================================
// Header Rendering
// =============================================================================

Deno.test("markdown - generates slug from header text", () => {
  const result = Markdown.render("# Hello World");

  expect(result).toContain('id="hello-world"');
  expect(result).toContain('href="#hello-world"');
});

Deno.test("markdown - removes special characters from slug", () => {
  const result = Markdown.render("# Hello, World! How's it going?");

  expect(result).toContain('id="hello-world-hows-it-going"');
});

Deno.test("markdown - preserves header levels", () => {
  const h1 = Markdown.render("# H1");
  const h2 = Markdown.render("## H2");
  const h3 = Markdown.render("### H3");

  expect(h1).toContain("<h1");
  expect(h2).toContain("<h2");
  expect(h3).toContain("<h3");
});

Deno.test("markdown - creates clickable anchor links", () => {
  const result = Markdown.render("# Test Header");

  expect(result).toContain('<a href="#test-header">Test Header</a>');
});

// =============================================================================
// Code Block Rendering
// =============================================================================

Deno.test("markdown - highlights typescript code", () => {
  const result = Markdown.render("```typescript\nconst x = 1;\n```");

  expect(result).toContain("<pre>");
  expect(result).toContain("line-number");
});

Deno.test("markdown - shows warning for unsupported language", () => {
  const result = Markdown.render("```python\nprint('hello')\n```");

  expect(result).toContain("NO SYNTAX HIGHLIGHTING CONFIGURED FOR python");
});

Deno.test("markdown - adds line numbers to code blocks", () => {
  const result = Markdown.render("```typescript\nline1\nline2\nline3\n```");

  expect(result).toContain('<span class="line-number"');
});

Deno.test("markdown - preserves code content without processing markdown", () => {
  const result = Markdown.render("```typescript\nconst x = **bold**;\n```");

  // Code should not be processed as bold
  expect(result).not.toContain("<strong>bold</strong>");
});

// =============================================================================
// List Rendering
// Note: The current markdown parser has limited list support. Lists require
// multiple consecutive items to be properly converted.
// =============================================================================

Deno.test("markdown - creates ul wrapper for unordered lists", () => {
  const result = Markdown.render("- Item 1\n- Item 2");

  expect(result).toContain("<ul>");
  expect(result).toContain("</ul>");
});

Deno.test("markdown - creates ol wrapper for ordered lists", () => {
  const result = Markdown.render("1. Item 1\n2. Item 2");

  expect(result).toContain("<ol>");
  expect(result).toContain("</ol>");
});

// =============================================================================
// Inline Formatting
// =============================================================================

Deno.test("markdown - converts bold text", () => {
  const result = Markdown.render("This is **bold** text");

  expect(result).toContain("<strong>bold</strong>");
});

Deno.test("markdown - converts italic text", () => {
  const result = Markdown.render("This is *italic* text");

  expect(result).toContain("<em>italic</em>");
});

Deno.test("markdown - converts inline code", () => {
  const result = Markdown.render("Use `console.log` for debugging");

  expect(result).toContain("<code>console.log</code>");
});

Deno.test("markdown - converts links with proper styling", () => {
  const result = Markdown.render("[Click here](https://example.com)");

  expect(result).toContain('href="https://example.com"');
  expect(result).toContain("text-primary");
  expect(result).toContain(">Click here</a>");
});

// =============================================================================
// Sanitization (Security)
// =============================================================================

Deno.test("markdown - removes script tags", () => {
  const result = Markdown.render('<script>alert("xss")</script>');

  expect(result).not.toContain("<script");
  expect(result).not.toContain("alert");
});

Deno.test("markdown - removes iframe tags", () => {
  const result = Markdown.render('<iframe src="evil.com"></iframe>');

  expect(result).not.toContain("<iframe");
});

Deno.test("markdown - removes style tags", () => {
  const result = Markdown.render("<style>body { display: none }</style>");

  expect(result).not.toContain("<style");
});

Deno.test("markdown - removes form tags", () => {
  const result = Markdown.render('<form action="evil.com"><input></form>');

  expect(result).not.toContain("<form");
});

Deno.test("markdown - preserves safe HTML content", () => {
  const result = Markdown.render("Regular **bold** text with [link](url)");

  expect(result).toContain("<strong>");
  expect(result).toContain("<a href=");
});

// =============================================================================
// Paragraph Wrapping
// =============================================================================

Deno.test("markdown - wraps text in paragraphs", () => {
  const result = Markdown.render("First paragraph\n\nSecond paragraph");

  expect(result).toContain("<p");
  expect(result).toContain("First paragraph");
  expect(result).toContain("Second paragraph");
});

Deno.test("markdown - does not wrap headers in paragraphs", () => {
  const result = Markdown.render("# Header\n\nParagraph text");

  // Header should not be inside a <p> tag
  expect(result).not.toContain("<p><h1");
});
