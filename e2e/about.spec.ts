import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("About Page", () => {
  test("should display about section", async ({ aboutPage }) => {
    await aboutPage.goto();
    await aboutPage.expectPageVisible();
  });

  test("should display author name in title", async ({ aboutPage }) => {
    await aboutPage.goto();
    await aboutPage.expectTitleContains("Gustavo Maltez");
  });

  test("should display author image", async ({ aboutPage }) => {
    await aboutPage.goto();
    await aboutPage.expectAuthorImageVisible();
  });

  test("should have proper page title", async ({ aboutPage, page }) => {
    await aboutPage.goto();
    await expect(page).toHaveTitle(/About/);
  });
});
