import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class ExperiencePage extends BasePage {
  readonly experienceSection: Locator;
  readonly experienceTitle: Locator;
  readonly professionalExperienceTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.experienceSection = page.getByTestId("experience-section");
    this.experienceTitle = page.getByTestId("experience-title");
    this.professionalExperienceTitle = page.getByTestId("professional-experience-title");
  }

  async goto() {
    await this.page.goto("/experience");
  }

  async expectPageVisible() {
    await expect(this.experienceSection).toBeVisible();
    await expect(this.experienceTitle).toBeVisible();
  }

  async expectTitleToBe(text: string) {
    await expect(this.experienceTitle).toHaveText(text);
  }

  async expectProfessionalExperienceSectionVisible() {
    await expect(this.professionalExperienceTitle).toBeVisible();
    await expect(this.professionalExperienceTitle).toHaveText("Professional Experience");
  }
}
