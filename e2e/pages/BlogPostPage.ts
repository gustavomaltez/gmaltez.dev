import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class BlogPostPage extends BasePage {
  readonly article: Locator;
  readonly blogHeader: Locator;
  readonly blogTitle: Locator;
  readonly blogTags: Locator;
  readonly blogAuthor: Locator;
  readonly blogMeta: Locator;
  readonly blogContent: Locator;

  constructor(page: Page) {
    super(page);
    this.article = page.getByTestId("blog-article");
    this.blogHeader = page.getByTestId("blog-header");
    this.blogTitle = page.getByTestId("blog-title");
    this.blogTags = page.getByTestId("blog-tags");
    this.blogAuthor = page.getByTestId("blog-author");
    this.blogMeta = page.getByTestId("blog-meta");
    this.blogContent = page.getByTestId("blog-content");
  }

  async goto(slug: string) {
    await this.page.goto(`/blog/${slug}`);
  }

  async expectArticleVisible() {
    await expect(this.article).toBeVisible();
  }

  async expectHeaderVisible() {
    await expect(this.blogHeader).toBeVisible();
    await expect(this.blogTitle).toBeVisible();
  }

  async expectTitleToBe(title: string) {
    await expect(this.blogTitle).toHaveText(title);
  }

  async expectTagsVisible() {
    await expect(this.blogTags).toBeVisible();
  }

  async getTags() {
    return this.blogTags.locator("[aria-label^='Tag:']");
  }

  async expectAuthorInfoVisible() {
    await expect(this.blogAuthor).toBeVisible();
    await expect(this.blogAuthor).toContainText("Gustavo Maltez");
  }

  async expectMetaVisible() {
    await expect(this.blogMeta).toBeVisible();
    await expect(this.blogMeta).toContainText("min read");
  }

  async expectContentVisible() {
    await expect(this.blogContent).toBeVisible();
  }

  async expectContentNotEmpty() {
    const content = await this.blogContent.textContent();
    expect(content?.trim().length).toBeGreaterThan(0);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
