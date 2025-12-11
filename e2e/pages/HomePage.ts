import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly postsHeading: Locator;
  readonly postsList: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.getByTestId("hero-section");
    this.heroTitle = page.getByTestId("hero-title");
    this.heroDescription = page.getByTestId("hero-description");
    this.postsHeading = page.getByTestId("posts-heading");
    this.postsList = page.getByTestId("posts-list");
  }

  async goto() {
    await this.page.goto("/");
  }

  async expectHeroVisible() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroTitle).toHaveText("Hello there!");
  }

  async expectPostsListVisible() {
    await expect(this.postsHeading).toBeVisible();
    await expect(this.postsHeading).toHaveText("Latest Posts");
    await expect(this.postsList).toBeVisible();
  }

  async getPostPreviews() {
    return this.postsList.locator("[data-testid^='post-preview-']");
  }

  async getPostPreviewCount() {
    const previews = await this.getPostPreviews();
    return previews.count();
  }

  async clickFirstPost() {
    const previews = await this.getPostPreviews();
    const firstPost = previews.first();
    await firstPost.click();
  }

  async clickPostBySlug(slug: string) {
    const post = this.page.getByTestId(`post-preview-${slug}`);
    await post.click();
  }

  async expectPostPreviewHasTitle(slug: string) {
    const post = this.page.getByTestId(`post-preview-${slug}`);
    const title = post.getByTestId("post-title");
    await expect(title).toBeVisible();
  }
}
