import { expect } from "jsr:@std/expect";
import { posts } from "./posts.ts";

// =============================================================================
// Integration tests using real posts in ./posts directory
// These tests verify business rules with actual data
// =============================================================================

Deno.test("posts.getAll - returns posts sorted by publishedAt descending", async () => {
  const allPosts = await posts.getAll();

  // Verify we have posts
  expect(allPosts.length).toBeGreaterThan(0);

  // Verify sorted by publishedAt descending (newest first)
  for (let i = 1; i < allPosts.length; i++) {
    expect(allPosts[i - 1].publishedAt).toBeGreaterThanOrEqual(
      allPosts[i].publishedAt,
    );
  }
});

Deno.test("posts.getAll - returns valid Post objects", async () => {
  const allPosts = await posts.getAll();

  for (const post of allPosts) {
    // All required fields should be present
    expect(post.slug).toBeTruthy();
    expect(post.title).toBeTruthy();
    expect(post.content).toBeTruthy();
    expect(post.snippet).toBeTruthy();
    expect(post.publishedAt).toBeGreaterThan(0);
    expect(Array.isArray(post.tags)).toBe(true);
  }
});

Deno.test("posts.getBySlug - throws for non-existent slug", async () => {
  // Note: getBySlug throws NotFound error for missing files
  // rather than returning null. This is current behavior.
  let threw = false;
  try {
    await posts.getBySlug("this-post-definitely-does-not-exist");
  } catch {
    threw = true;
  }
  expect(threw).toBe(true);
});

Deno.test("posts.getBySlug - returns valid post for existing slug", async () => {
  // Get a real slug from getAll
  const allPosts = await posts.getAll();
  if (allPosts.length === 0) {
    return; // Skip if no posts exist
  }

  const existingSlug = allPosts[0].slug;
  const post = await posts.getBySlug(existingSlug);

  expect(post).not.toBeNull();
  expect(post?.slug).toBe(existingSlug);
});

// =============================================================================
// Tag Parsing
// =============================================================================

Deno.test("posts - tags are parsed as trimmed array", async () => {
  const allPosts = await posts.getAll();

  for (const post of allPosts) {
    // Tags should be an array
    expect(Array.isArray(post.tags)).toBe(true);

    // Each tag should be trimmed (no leading/trailing whitespace)
    for (const tag of post.tags) {
      expect(tag).toBe(tag.trim());
    }
  }
});

// =============================================================================
// Date Conversion
// =============================================================================

Deno.test("posts - publishedAt is a valid unix timestamp in milliseconds", async () => {
  const allPosts = await posts.getAll();

  for (const post of allPosts) {
    // Should be a positive integer
    expect(Number.isInteger(post.publishedAt)).toBe(true);
    expect(post.publishedAt).toBeGreaterThan(0);

    // Should be a reasonable date (after 2020, before 2100)
    const date = new Date(post.publishedAt);
    expect(date.getFullYear()).toBeGreaterThanOrEqual(2020);
    expect(date.getFullYear()).toBeLessThan(2100);
  }
});
