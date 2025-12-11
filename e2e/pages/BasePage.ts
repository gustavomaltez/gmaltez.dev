import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly mainNav: Locator;
  readonly logoLink: Locator;
  readonly navPosts: Locator;
  readonly navAbout: Locator;
  readonly navExperience: Locator;
  readonly navResume: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId("header");
    this.mainNav = page.getByTestId("main-nav");
    this.logoLink = page.getByTestId("logo-link");
    this.navPosts = page.getByTestId("nav-posts");
    this.navAbout = page.getByTestId("nav-about");
    this.navExperience = page.getByTestId("nav-experience");
    this.navResume = page.getByTestId("nav-resume");
    this.mainContent = page.getByTestId("main-content");
    this.footer = page.getByTestId("footer");
  }

  async navigateToHome() {
    await this.logoLink.click();
    await this.page.waitForURL("/");
  }

  async navigateToPosts() {
    await this.navPosts.click();
    await this.page.waitForURL("/");
  }

  async navigateToAbout() {
    await this.navAbout.click();
    await this.page.waitForURL("/about");
  }

  async navigateToExperience() {
    await this.navExperience.click();
    await this.page.waitForURL("/experience");
  }

  async expectHeaderVisible() {
    await expect(this.header).toBeVisible();
  }

  async expectFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  async expectNavigationVisible() {
    await expect(this.mainNav).toBeVisible();
    await expect(this.navPosts).toBeVisible();
    await expect(this.navAbout).toBeVisible();
    await expect(this.navExperience).toBeVisible();
    await expect(this.navResume).toBeVisible();
  }
}
