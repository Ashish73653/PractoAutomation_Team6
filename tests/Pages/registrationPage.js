const fs = require("fs");
const path = require("path");
const { expect } = require("@playwright/test");

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.loginSignupLink = page.getByRole("link", { name: /Login \/ Signup/i });
    this.registerTab = page.getByText("Register", { exact: true });
    this.fullNameInput = page.getByPlaceholder("Full Name");
    this.mobileNumberInput = page.getByPlaceholder("Mobile Number");
    this.passwordInput = page.getByPlaceholder("Password");
    this.sendOtpButton = page
      .getByRole("button", { name: /Send OTP/i })
      .or(page.locator('input[type="submit"][value="Send OTP"]'));
    this.verifyMobileHeading = page.getByText(/Verify Mobile/i);
  }

  async navigateTo() {
    await this.page.goto("https://www.practo.com/", {
      waitUntil: "domcontentloaded",
    });

    await this.loginSignupLink.click();
    await expect(this.registerTab).toBeVisible();
    await this.registerTab.click();
    await expect(this.fullNameInput).toBeVisible();
  }

  async fillRegistrationForm(fullName, mobileNumber, password) {
    await this.fullNameInput.fill(fullName);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.passwordInput.fill(password);
  }

  async clickSendOtp() {
    await this.sendOtpButton.click();
  }

  async getRegistrationResult() {
  await this.page.waitForTimeout(3000);

  const registrationFormVisible = await this.fullNameInput
    .isVisible()
    .catch(() => false);

  if (registrationFormVisible) {
    const hasEmptyRequiredFields =
      !(await this.fullNameInput.inputValue()) ||
      !(await this.mobileNumberInput.inputValue()) ||
      !(await this.passwordInput.inputValue());

    const validationTextVisible = await this.page
      .locator(".error, .u-error, [class*='error'], [class*='Error']")
      .filter({ hasText: /\S/ })
      .first()
      .isVisible()
      .catch(() => false);

    if (hasEmptyRequiredFields || validationTextVisible) {
      await this.page.screenshot({
        path: screenshotPath("registration-validation-error.png"),
        fullPage: true,
      });

      return "Validation Error";
    }
  }

  const bodyText = await this.page.locator("body").innerText();
  const normalizedText = bodyText.replace(/\s+/g, " ").trim();

  const otpScreenVisible =
    /verify mobile|sent you an otp|otp|6 digit otp|resend otp|get via call/i.test(
      normalizedText
    );

  if (otpScreenVisible) {
    await this.page.screenshot({
      path: screenshotPath("registration-otp-screen.png"),
      fullPage: true,
    });

    return "OTP Sent";
  }

  await this.page.screenshot({
    path: screenshotPath("registration-unexpected-result.png"),
    fullPage: true,
  });

  console.log("Registration page text:", normalizedText);

  return "Failure";
}
}

module.exports = RegistrationPage;
