import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class AboutPage extends BasePage {
  readonly aboutSection: Locator;
  readonly aboutHeader: Locator;
  readonly aboutTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutSection = page.getByTestId("about-section");
    this.aboutHeader = page.getByTestId("about-header");
    this.aboutTitle = page.getByTestId("about-title");
  }

  async goto() {
    await this.page.goto("/about");
  }

  async expectPageVisible() {
    await expect(this.aboutSection).toBeVisible();
    await expect(this.aboutHeader).toBeVisible();
    await expect(this.aboutTitle).toBeVisible();
  }

  async expectTitleContains(text: string) {
    await expect(this.aboutTitle).toContainText(text);
  }

  async expectAuthorImageVisible() {
    const image = this.aboutHeader.locator("img");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", /Gustavo Maltez/);
  }
}
