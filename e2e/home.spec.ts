import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("Home Page", () => {
  test("should display hero section", async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectHeroVisible();
  });

  test("should display posts list", async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectPostsListVisible();
  });

  test("should have at least one post preview", async ({ homePage }) => {
    await homePage.goto();
    const count = await homePage.getPostPreviewCount();
    expect(count).toBeGreaterThan(0);
  });

  test("should display post preview with title and snippet", async ({ homePage }) => {
    await homePage.goto();
    const previews = await homePage.getPostPreviews();
    const firstPreview = previews.first();

    await expect(firstPreview.getByTestId("post-title")).toBeVisible();
    await expect(firstPreview.getByTestId("post-snippet")).toBeVisible();
  });

  test("should navigate to blog post when clicking preview", async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.clickFirstPost();
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
