class ContactUsFormPage {
  constructor(page) {
    this.setPage(page);
  }

  setPage(page) {
    this.page = page;

    this.contactUslink = page.locator('//span[text()="Contact Us"]');
    this.interestDropdown = page.locator('//select[@name="interested"]');
    this.nameInputTextField = page.getByPlaceholder("Enter your name");
    this.mobileInputTextField = page.locator(".require.phone");
    this.emailInputTextField = page.locator('//input[@name="email"]');
    this.countryDropdown = page.locator('//select[@name="country"]');
    this.cityInputTextField = page.locator('//input[@name="city"]');
    this.messageTextArea = page.getByPlaceholder("Message");
    this.submitButton = page.locator('//input[@type="submit"]');
    this.successMessage = page.locator("text=Thank");

    // Negative: generic validation error container
    this.validationError = page.locator(".error");
  }

  async openPractoWebsite(url) {
    await this.page.goto(url);
  }

  async verifyHomepageLoaded() {
    await this.page.waitForLoadState("networkidle");
  }

  async openContactUsPageInNewTab() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.contactUslink.click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    this.setPage(newPage);
  }

  async selectInterest(interest) {
    await this.interestDropdown.selectOption({ label: interest });
  }

  async enterName(name) {
    await this.nameInputTextField.fill(name);
  }

  async enterMobileNumber(number) {
    await this.mobileInputTextField.fill(number);
  }

  async enterEmail(email) {
    await this.emailInputTextField.fill(email);
  }

  async verifyCountry(expectedCountry) {
    const actualCountry = await this.countryDropdown.inputValue();
    if (actualCountry !== expectedCountry) {
      throw new Error(
        `Expected country ${expectedCountry} but found ${actualCountry}`,
      );
    }
  }

  async enterCity(city) {
    await this.cityInputTextField.fill(city);
  }

  async enterMessage(message) {
    await this.messageTextArea.fill(message);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async verifyContactRequestSubmitted() {
    await this.successMessage.waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  // Negative: form must still be visible (not navigated away)
  async verifyFormNotSubmitted() {
    await this.submitButton.waitFor({
      state: "visible",
      timeout: 5000,
    });
  }

  // Negative: assert the specific error message text is visible
  async verifyValidationError() {
    const hasNameError = await this.nameInputTextField.evaluate((el) =>
      el.classList.contains("error"),
    );

    const hasMobileError = await this.mobileInputTextField.evaluate((el) =>
      el.classList.contains("error"),
    );

    const hasEmailError = await this.emailInputTextField.evaluate((el) =>
      el.classList.contains("error"),
    );

    if (!hasNameError && !hasMobileError && !hasEmailError) {
      throw new Error("Validation error class was not applied");
    }
  }

  async captureScreenshot(filename = "contact-us-form") {
    await this.page.screenshot({
      path: `screenshots/${filename}.png`,
      fullPage: true,
    });
  }
}

module.exports = ContactUsFormPage;