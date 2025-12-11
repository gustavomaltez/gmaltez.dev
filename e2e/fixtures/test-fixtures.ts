import { test as base } from "@playwright/test";
import { HomePage, BlogPostPage, AboutPage, ExperiencePage } from "../pages/index.ts";

type Pages = {
  homePage: HomePage;
  blogPostPage: BlogPostPage;
  aboutPage: AboutPage;
  experiencePage: ExperiencePage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  blogPostPage: async ({ page }, use) => {
    await use(new BlogPostPage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  experiencePage: async ({ page }, use) => {
    await use(new ExperiencePage(page));
  },
});

export { expect } from "@playwright/test";
