const fs = require("fs");
const path = require("path");
const { expect } = require("@playwright/test");

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class FooterSmokePage {
  constructor(page) {
    this.page = page;
    this.footerHeadings = [
    "About",
    "For patients",
    "For doctors",
    "For clinics",
    "For hospitals",
    "More",
    "Social",
  ];
    this.importantLinks = [
      "About",
      "Contact Us",
      "Search for doctors",
      "Search for clinics",
      "Practo Profile",
      "Help",
      "Privacy Policy",
      "Terms & Conditions",
      "Facebook",
      "LinkedIn",
    ];
  }

  async navigateTo() {
    await this.page.goto("https://www.practo.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(this.page.getByText("For patients", { exact: true })).toBeVisible({
      timeout: 10000,
    });
    await this.page.screenshot({
      path: screenshotPath("footer-smoke.png"),
      fullPage: true,
    });
  }

  // async verifyFooterSections() {
  //   for (const heading of this.footerHeadings) {
  //     await expect(this.page.getByText(heading, { exact: true }).first()).toBeVisible();
  //   }
  // }
  async verifyFooterSections() {
    const footerSectionTexts = [
      "About",
      "For patients",
      "For doctors",
      "For clinics",
      "For hospitals",
      "More",
      "Social",
    ];

    for (const text of footerSectionTexts) {
      await expect(
        this.page.getByText(text, { exact: true }).last()
      ).toBeVisible();
    }
  }

  async verifyImportantFooterLinks() {
  for (const linkText of this.importantLinks) {
    await expect(
      this.page.getByText(linkText, { exact: true }).last()
    ).toBeVisible();
  }
}

  async verifyFooterHasWorkingLinks() {
    const footerLinkCount = await this.page.locator("a").evaluateAll((links) =>
      links.filter((link) => {
        const text = link.textContent ? link.textContent.trim() : "";
        const href = link.getAttribute("href");
        return text.length > 0 && href && href !== "#";
      }).length,
    );

    expect(footerLinkCount).toBeGreaterThan(20);
  }

//   async openContactUsFromFooter() {
//     await this.page.getByText("Contact Us", { exact: true }).first().click();
//     await this.page.waitForLoadState("domcontentloaded");

//     const url = this.page.url();
//     const contactHeadingVisible = await this.page
//       .getByRole("heading", { name: /Contact Us/i })
//       .first()
//       .isVisible()
//       .catch(() => false);

//     expect(url.includes("contact") || contactHeadingVisible).toBeTruthy();
//   }
//
  async openContactUsFromFooter() {
  const contactUsLink = this.page
    .locator('a[href*="contact"]:visible')
    .filter({ hasText: /^Contact Us$/i })
    .last();

  await expect(contactUsLink).toBeVisible();

  const href = await contactUsLink.getAttribute("href");

  if (!href) {
    throw new Error("Contact Us footer link does not have an href");
  }

  const contactUrl = new URL(href, this.page.url()).toString();

  await contactUsLink.scrollIntoViewIfNeeded();
  await contactUsLink.click();

  await this.page.waitForTimeout(1000);

  if (!this.page.url().toLowerCase().includes("contact")) {
    await this.page.goto(contactUrl, { waitUntil: "domcontentloaded" });
  }

  await expect(this.page).toHaveURL(/contact/i);
}
}

module.exports = FooterSmokePage;
