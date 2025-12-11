import { test, expect } from "./fixtures/test-fixtures.ts";

test.describe("User Journey", () => {
  test("complete user journey - browse posts, read article, explore site", async ({
    homePage,
    blogPostPage,
    aboutPage,
    experiencePage,
    page,
  }) => {
    await test.step("Visit home page", async () => {
      await homePage.goto();
      await homePage.expectHeroVisible();
      await homePage.expectPostsListVisible();
    });

    await test.step("Click on first blog post", async () => {
      await homePage.clickFirstPost();
      await page.waitForURL(/\/blog\/.+/);
    });

    await test.step("Read blog post - verify all sections", async () => {
      await blogPostPage.expectArticleVisible();
      await blogPostPage.expectHeaderVisible();
      await blogPostPage.expectTagsVisible();
      await blogPostPage.expectAuthorInfoVisible();
      await blogPostPage.expectContentVisible();
    });

    await test.step("Scroll through the article", async () => {
      await blogPostPage.scrollToBottom();
      await page.waitForTimeout(300);
      await blogPostPage.scrollToTop();
    });

    await test.step("Navigate to About page", async () => {
      await blogPostPage.navigateToAbout();
      await aboutPage.expectPageVisible();
      await aboutPage.expectTitleContains("Gustavo Maltez");
    });

    await test.step("Navigate to Experience page", async () => {
      await aboutPage.navigateToExperience();
      await experiencePage.expectPageVisible();
      await experiencePage.expectProfessionalExperienceSectionVisible();
    });

    await test.step("Return home via logo", async () => {
      await experiencePage.navigateToHome();
      await homePage.expectHeroVisible();
    });

    await test.step("Verify posts are still visible", async () => {
      await homePage.expectPostsListVisible();
      const postCount = await homePage.getPostPreviewCount();
      expect(postCount).toBeGreaterThan(0);
    });
  });

  test("mobile user journey - responsive navigation", async ({
    homePage,
    aboutPage,
    page,
  }) => {
    await test.step("Set mobile viewport", async () => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    await test.step("Navigate to home page", async () => {
      await homePage.goto();
      await homePage.expectHeaderVisible();
      await homePage.expectNavigationVisible();
    });

    await test.step("Navigate to about page", async () => {
      await homePage.navigateToAbout();
      await aboutPage.expectPageVisible();
    });

    await test.step("Navigate back home", async () => {
      await aboutPage.navigateToHome();
      await homePage.expectHeroVisible();
    });
  });
});
