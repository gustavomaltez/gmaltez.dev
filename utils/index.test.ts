import { expect } from "jsr:@std/expect";
import {
  extractTextMetadataAndContent,
  getEstimatedReadingTime,
} from "./index.ts";

// =============================================================================
// getEstimatedReadingTime
// =============================================================================

Deno.test("getEstimatedReadingTime - returns 1 minute for 200 words or less", () => {
  const words = Array(200).fill("word").join(" ");
  expect(getEstimatedReadingTime(words)).toBe(1);
});

Deno.test("getEstimatedReadingTime - returns 2 minutes for 201 words", () => {
  const words = Array(201).fill("word").join(" ");
  expect(getEstimatedReadingTime(words)).toBe(2);
});

Deno.test("getEstimatedReadingTime - rounds up partial minutes", () => {
  const words = Array(250).fill("word").join(" ");
  expect(getEstimatedReadingTime(words)).toBe(2);
});

Deno.test("getEstimatedReadingTime - handles large text", () => {
  const words = Array(1000).fill("word").join(" ");
  expect(getEstimatedReadingTime(words)).toBe(5);
});

Deno.test("getEstimatedReadingTime - returns 1 for empty string", () => {
  // Note: split(/\s/g) on empty string returns [""], so length is 1
  // This is current behavior - empty posts show 1 min read
  expect(getEstimatedReadingTime("")).toBe(1);
});

Deno.test("getEstimatedReadingTime - returns 1 for whitespace only", () => {
  expect(getEstimatedReadingTime("   \n\t  ")).toBe(1);
});

// =============================================================================
// extractTextMetadataAndContent
// =============================================================================

Deno.test("extractTextMetadataAndContent - extracts simple key-value metadata", () => {
  const text = `---
title: Hello World
snippet: A short description
---
# Content here`;

  const { metadata, content } = extractTextMetadataAndContent(text);

  expect(metadata.title).toBe("Hello World");
  expect(metadata.snippet).toBe("A short description");
  expect(content).toContain("# Content here");
});

Deno.test("extractTextMetadataAndContent - handles multi-line metadata values", () => {
  const text = `---
title: Hello World
description: This is a long
  description that spans
  multiple lines
---
Content`;

  const { metadata } = extractTextMetadataAndContent(text);

  expect(metadata.description).toContain("This is a long");
  expect(metadata.description).toContain("multiple lines");
});

Deno.test("extractTextMetadataAndContent - returns empty metadata for text without front matter", () => {
  const text = "# Just content\nNo front matter here";

  const { metadata, content } = extractTextMetadataAndContent(text);

  expect(Object.keys(metadata)).toHaveLength(0);
  expect(content).toContain("# Just content");
});

Deno.test("extractTextMetadataAndContent - preserves content newlines", () => {
  const text = `---
title: Test
---
Line 1

Line 2

Line 3`;

  const { content } = extractTextMetadataAndContent(text);

  expect(content).toContain("Line 1");
  expect(content).toContain("Line 2");
  expect(content).toContain("Line 3");
});

Deno.test("extractTextMetadataAndContent - handles tags as comma-separated string", () => {
  const text = `---
tags: typescript, deno, fresh
---
Content`;

  const { metadata } = extractTextMetadataAndContent(text);

  expect(metadata.tags).toBe("typescript, deno, fresh");
});

Deno.test("extractTextMetadataAndContent - handles ISO date strings", () => {
  const text = `---
published_at: 2024-06-15T15:22:05.256Z
---
Content`;

  const { metadata } = extractTextMetadataAndContent(text);

  expect(metadata.published_at).toBe("2024-06-15T15:22:05.256Z");
});
