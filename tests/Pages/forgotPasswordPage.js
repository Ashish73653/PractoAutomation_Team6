// const {expect} = require('playwright/test')

// class forgotPasswordPage{
//     constructor(page){
//         this.page = page

//         this.forgotPasswordLink = page.locator('a#forgotPassword')

//         this.mobileNumberField = page.getByPlaceholder('Email id/ Mobile Number')
//         this.sendMeInstructions = page.locator('input#submitBtn')
//         this.loginBtn = page.getByRole("Button",{name:"loginBtn"})
//         this.newPasswordTF = page.getByPlaceholder('New Password')
//         this.confirmNewPasswordTF = page.getByPlaceholder("Confirm New Password")
//         this.changePasswordBtn = page.getByPlaceholder('Chnage Password')
//     }
//     async navigateTo(){
//         await this.page.goto("https://www.practo.com/")
//         await this.page.locator('//a[text()="Login / Signup"]').click()
//     }
//     async gotoForgotPasswordPage(){
//         await this.forgotPasswordLink.click()
//     }
//     async enterMobileNumber(mobileNumber){
//         await this.mobileNumberField.fill(mobileNumber)
//     }
//     async clickOnSendMeInstructions(){
//         await this.sendMeInstructions.click()
//     }
//     async clickOnLoginBtn(){
//         await this.loginBtn.click()
//     }
//     async enterNewPassword(newPassword){
//         await this.newPasswordTF.fill(newPassword)
//     }
//     async enterConfirmNewPassword(confirmNewPassword){
//         await this.confirmNewPasswordTF.fill(confirmNewPassword)
//     }
//     async clickOnChangePassword(){
//         await this.changePasswordBtn.click()
//     }
// }

// module.exports = forgotPasswordPage;
const fs = require("fs");
const path = require("path");
const { expect } = require("@playwright/test");

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class ForgotPasswordPage {
  constructor(page) {
    this.page = page;

    this.forgotPasswordLink = page
      .locator("a#forgotPassword")
      .or(page.getByText(/Forgot Password/i));

    this.mobileNumberField = page
      .getByPlaceholder(/Email id\/ Mobile Number/i)
      .or(page.getByPlaceholder(/Mobile Number|Email/i))
      .first();

    this.sendMeInstructions = page
      .locator("input#submitBtn")
      .or(page.getByRole("button", { name: /Send me instructions/i }))
      .or(page.locator('input[type="submit"]'))
      .first();

    this.otpInput = page
      .getByPlaceholder(/OTP|6 digit/i)
      .or(page.locator('input[name*="otp" i], input[id*="otp" i]'))
      .first();

    this.loginBtn = page
      .getByRole("button", { name: /Login/i })
      .or(page.locator('input[type="submit"][value="Login"]'))
      .first();

    this.newPasswordTF = page.locator("#new_password");
    this.confirmNewPasswordTF = page.locator("#confirm");


    this.changePasswordBtn = page.locator('button[type="submit"]')
  }

  async navigateTo() {
    await this.page.goto("https://www.practo.com/", {
      waitUntil: "domcontentloaded",
    });

    await this.page.locator('//a[text()="Login / Signup"]').click();

    await this.page.screenshot({
      path: screenshotPath("forgot-password-00-login-page.png"),
      fullPage: true,
    });
  }

  async gotoForgotPasswordPage() {
    await this.forgotPasswordLink.click();
    await expect(this.mobileNumberField).toBeVisible();

    await this.page.screenshot({
      path: screenshotPath("forgot-password-01-page-opened.png"),
      fullPage: true,
    });
  }

  async enterMobileNumber(mobileNumber) {
    await this.mobileNumberField.fill(mobileNumber);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-02-mobile-entered.png"),
      fullPage: true,
    });
  }

  async clickOnSendMeInstructions() {
    await this.sendMeInstructions.click();

    await this.page.waitForTimeout(3000);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-03-otp-screen.png"),
      fullPage: true,
    });
  }

  async enterOtp(otp) {
    await this.otpInput.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await this.otpInput.fill(otp);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-04-otp-entered.png"),
      fullPage: true,
    });
  }

  async clickOnLoginBtn() {
    await this.loginBtn.click();

    await this.page.waitForTimeout(3000);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-05-new-password-page.png"),
      fullPage: true,
    });
  }

  async enterNewPassword(newPassword) {
    await this.newPasswordTF.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await this.newPasswordTF.fill(newPassword);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-06-new-password-entered.png"),
      fullPage: true,
    });
  }

  async enterConfirmNewPassword(confirmNewPassword) {
    await this.confirmNewPasswordTF.fill(confirmNewPassword);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-07-confirm-password-entered.png"),
      fullPage: true,
    });
  }

  async clickOnChangePassword() {
    await this.changePasswordBtn.click();

    await this.page.waitForTimeout(3000);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-08-password-change-submitted.png"),
      fullPage: true,
    });
  }

  async getResultMessage(expectedMessage) {
    await this.page.waitForTimeout(2000);

    await this.page.screenshot({
      path: screenshotPath("forgot-password-09-final-result.png"),
      fullPage: true,
    });

    const bodyText = await this.page.locator("body").innerText();

    if (bodyText.includes(expectedMessage)) {
      return expectedMessage;
    }

    return bodyText.replace(/\s+/g, " ").trim();
  }
}

module.exports = ForgotPasswordPage;
