import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("Experience Page", () => {
  test("should display experience section", async ({ experiencePage }) => {
    await experiencePage.goto();
    await experiencePage.expectPageVisible();
  });

  test("should display main title", async ({ experiencePage }) => {
    await experiencePage.goto();
    await experiencePage.expectTitleToBe("Which Professional Am I?");
  });

  test("should display professional experience section", async ({ experiencePage }) => {
    await experiencePage.goto();
    await experiencePage.expectProfessionalExperienceSectionVisible();
  });

  test("should have proper page title", async ({ experiencePage, page }) => {
    await experiencePage.goto();
    await expect(page).toHaveTitle(/Experience/);
  });
});
