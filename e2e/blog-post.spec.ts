import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("Blog Post Page", () => {
  test.beforeEach(async ({ homePage, page }) => {
    // Navigate to a blog post from home page
    await homePage.goto();
    await homePage.clickFirstPost();
    await page.waitForURL(/\/blog\/.+/);
  });

  test("should display article with header", async ({ blogPostPage }) => {
    await blogPostPage.expectArticleVisible();
    await blogPostPage.expectHeaderVisible();
  });

  test("should display blog title", async ({ blogPostPage }) => {
    await expect(blogPostPage.blogTitle).toBeVisible();
    const title = await blogPostPage.blogTitle.textContent();
    expect(title?.trim().length).toBeGreaterThan(0);
  });

  test("should display tags", async ({ blogPostPage }) => {
    await blogPostPage.expectTagsVisible();
    const tags = await blogPostPage.getTags();
    const count = await tags.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display author information", async ({ blogPostPage }) => {
    await blogPostPage.expectAuthorInfoVisible();
  });

  test("should display reading time", async ({ blogPostPage }) => {
    await blogPostPage.expectMetaVisible();
  });

  test("should display blog content", async ({ blogPostPage }) => {
    await blogPostPage.expectContentVisible();
    await blogPostPage.expectContentNotEmpty();
  });

  test("should be able to scroll through content", async ({ blogPostPage, page }) => {
    await blogPostPage.scrollToBottom();

    // Wait for scroll to complete
    await page.waitForTimeout(500);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});
