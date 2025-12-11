import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("Navigation", () => {
  test("should display header and navigation on all pages", async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectHeaderVisible();
    await homePage.expectNavigationVisible();
    await homePage.expectFooterVisible();
  });

  test("should navigate to About page", async ({ homePage, aboutPage }) => {
    await homePage.goto();
    await homePage.navigateToAbout();
    await aboutPage.expectPageVisible();
  });

  test("should navigate to Experience page", async ({ homePage, experiencePage }) => {
    await homePage.goto();
    await homePage.navigateToExperience();
    await experiencePage.expectPageVisible();
  });

  test("should navigate back to Home via logo", async ({ aboutPage, homePage }) => {
    await aboutPage.goto();
    await aboutPage.navigateToHome();
    await homePage.expectHeroVisible();
  });

  test("should navigate back to Home via Posts link", async ({ experiencePage, homePage }) => {
    await experiencePage.goto();
    await experiencePage.navigateToPosts();
    await homePage.expectHeroVisible();
  });

  test("should have Resume link with correct href", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.navResume).toHaveAttribute("href", "/gustavo_maltez_resume.pdf");
  });
});
