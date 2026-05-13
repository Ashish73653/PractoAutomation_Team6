// const fs = require("fs");
// const path = require("path");
// const { expect } = require("@playwright/test");

// const CONTACT_US_URL = "https://help.practo.com/practo-ray/calendar/contact-us/";

// function screenshotPath(fileName) {
//   const directory = path.resolve(__dirname, "../../screenshots");
//   fs.mkdirSync(directory, { recursive: true });
//   return path.join(directory, fileName);
// }

// async function isVisible(locator, timeout = 3000) {
//   return locator
//     .waitFor({ state: "visible", timeout })
//     .then(() => true)
//     .catch(() => false);
// }

// class ContactUsPage {
//   constructor(page) {
//     this.page = page;
//     this.form = page.locator("form").first();
//     this.heading = page.getByRole("heading", { name: /Contact Us/i }).first();
//     this.submitButton = page
//       .getByRole("button", { name: /Submit/i })
//       .or(page.locator('input[type="submit"][value="Submit"]'));
//   }

//   async navigateThroughSecurityHelp() {
//     await this.page.goto("https://www.practo.com/", {
//       waitUntil: "domcontentloaded",
//     });

//     const securityHelp = this.page.getByText(/Security & help/i).first();
//     if (await isVisible(securityHelp, 3000)) {
//       await securityHelp.click();

//       const helpLink = this.page
//         .getByRole("link", { name: /^Help$/i })
//         .or(this.page.getByText("Help", { exact: true }))
//         .first();

//       if (await isVisible(helpLink, 3000)) {
//         await helpLink.click();
//         await this.page.waitForLoadState("domcontentloaded");
//         return;
//       }
//     }

//     await this.page.goto("https://help.practo.com/", {
//       waitUntil: "domcontentloaded",
//     });
//   }

//   async openContactUsForm() {
//     const contactUsButton = this.page
//       .getByRole("link", { name: /Contact Us/i })
//       .or(this.page.getByRole("button", { name: /Contact Us/i }))
//       .or(this.page.getByText("Contact Us", { exact: true }))
//       .last();

//     if (await isVisible(contactUsButton, 3000)) {
//       await contactUsButton.click();
//       await this.page.waitForLoadState("domcontentloaded");
//     }

//     if (!this.page.url().includes("contact-us")) {
//       await this.page.goto(CONTACT_US_URL, { waitUntil: "domcontentloaded" });
//     }

//     await expect(this.heading).toBeVisible();
//     await expect(this.form.locator("textarea").first()).toBeVisible();
//   }

//   async openDirectly() {
//     await this.page.goto(CONTACT_US_URL, { waitUntil: "domcontentloaded" });
//     await expect(this.heading).toBeVisible();
//   }

//   async fillContactForm({
//     name,
//     mobileNumber,
//     email,
//     country,
//     city,
//     interestedIn,
//     ownsClinic,
//     userType,
//     message,
//   }) {
//     const inputs = this.form.locator(
//       'input:not([type="hidden"]):not([type="submit"]):not([type="button"])',
//     );
//     const selects = this.form.locator("select");

//     await inputs.nth(0).fill(name);
//     await inputs.nth(1).fill(mobileNumber);
//     await inputs.nth(2).fill(email);
//     await this.selectByVisibleText(selects.nth(0), country);
//     await inputs.nth(3).fill(city);
//     await this.selectByVisibleText(selects.nth(1), interestedIn);
//     await this.selectByVisibleText(selects.nth(2), ownsClinic);
//     await this.selectByVisibleText(selects.nth(3), userType);
//     await this.form.locator("textarea").first().fill(message);

//     await this.page.screenshot({
//       path: screenshotPath("contact-us-filled-form.png"),
//       fullPage: true,
//     });
//   }

//   async selectByVisibleText(selectLocator, preferredText) {
//     const options = await selectLocator.locator("option").evaluateAll((items) =>
//       items.map((item) => ({
//         text: item.textContent ? item.textContent.trim() : "",
//         value: item.value,
//       })),
//     );

//     const lowerPreferredText = preferredText.toLowerCase();
//     const exactMatch = options.find(
//       (option) => option.text.toLowerCase() === lowerPreferredText,
//     );
//     const partialMatch = options.find((option) =>
//       option.text.toLowerCase().includes(lowerPreferredText),
//     );
//     const firstUsableOption = options.find(
//       (option) => option.value && !/choose/i.test(option.text),
//     );
//     const optionToSelect = exactMatch || partialMatch || firstUsableOption;

//     if (!optionToSelect) {
//       throw new Error(`No selectable option found for "${preferredText}"`);
//     }

//     await selectLocator.selectOption(optionToSelect.value);
//   }

//   async submitForm() {
//     await this.submitButton.first().click();
//   }

//   async verifySubmitAttempt() {
//     await this.page.waitForTimeout(2000);

//     const bodyText = await this.page.locator("body").innerText();
//     const successVisible = /thank|success|submitted|shortly/i.test(bodyText);
//     const protectedByCaptcha = /recaptcha|protected/i.test(bodyText);
//     const formStillVisible = await isVisible(this.form.locator("textarea").first(), 1000);

//     await this.page.screenshot({
//       path: screenshotPath("contact-us-submit-result.png"),
//       fullPage: true,
//     });

//     expect(successVisible || protectedByCaptcha || formStillVisible).toBeTruthy();
//   }
// }

// module.exports = ContactUsPage;

const fs = require("fs");
const path = require("path");
const { expect } = require("@playwright/test");

const CONTACT_US_URL = "https://help.practo.com/practo-ray/calendar/contact-us/";

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class ContactUsPage {
  constructor(page) {
    this.page = page;

    this.formFrame = page.frameLocator("iframe.wufoo-form-container");

    this.nameInput = this.formFrame.locator("#Field1");
    this.mobileInput = this.formFrame.locator("#Field2");
    this.emailInput = this.formFrame.locator("#Field15");
    this.countryDropdown = this.formFrame.locator("#Field20");
    this.cityInput = this.formFrame.locator("#Field13");
    this.interestedInDropdown = this.formFrame.locator("#Field7");
    this.ownClinicDropdown = this.formFrame.locator("#Field22");
    this.userTypeDropdown = this.formFrame.locator("#Field24");
    this.messageInput = this.formFrame.locator("#Field9");
    this.submitButton = this.formFrame.locator("#saveForm");
  }

  async navigateThroughSecurityHelp() {
    await this.page.goto("https://help.practo.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async openContactUsForm() {
    await this.page.goto(CONTACT_US_URL, {
      waitUntil: "load",
      timeout: 60000,
    });

    await this.page
      .locator("iframe.wufoo-form-container")
      .waitFor({ state: "attached", timeout: 60000 });

    await this.nameInput.waitFor({
      state: "visible",
      timeout: 60000,
    });
  }

  async fillContactForm({
    name,
    mobileNumber,
    email,
    country,
    city,
    interestedIn,
    ownsClinic,
    userType,
    message,
  }) {
    await this.nameInput.fill(name);
    await this.mobileInput.fill(mobileNumber);
    await this.emailInput.fill(email);

    await this.selectByVisibleText(this.countryDropdown, country);
    await this.cityInput.fill(city);

    await this.selectByVisibleText(this.interestedInDropdown, interestedIn);
    await this.selectByVisibleText(this.ownClinicDropdown, ownsClinic);
    await this.selectByVisibleText(this.userTypeDropdown, userType);

    await this.messageInput.fill(message);

    await this.page.screenshot({
      path: screenshotPath("contact-us-filled-form.png"),
      fullPage: true,
    });
  }

  async selectByVisibleText(dropdown, text) {
    const options = await dropdown.locator("option").evaluateAll((items) =>
      items.map((item) => ({
        label: item.textContent.trim(),
        value: item.value,
      }))
    );

    const option = options.find((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );

    if (!option) {
      throw new Error(`Dropdown option not found: ${text}`);
    }

    await dropdown.selectOption(option.value);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySubmitAttempt() {
  const successMessage =
    /Great!\s*Thanks for reaching out to us\.\s*We will get back shortly\./i;

  let successVisible = false;

  try {
    await this.page.getByText(successMessage).waitFor({
      state: "visible",
      timeout: 30000,
    });

    successVisible = true;
  } catch (error) {
    successVisible = false;
  }

  if (!successVisible) {
    try {
      await this.formFrame.getByText(successMessage).waitFor({
        state: "visible",
        timeout: 30000,
      });

      successVisible = true;
    } catch (error) {
      successVisible = false;
    }
  }

  await this.page.screenshot({
    path: screenshotPath("contact-us-submit-result.png"),
    fullPage: true,
  });

  expect(successVisible).toBeTruthy();
}

}

module.exports = ContactUsPage;
