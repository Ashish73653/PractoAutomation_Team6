const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const ForgotPasswordPage = require("../Pages/forgotPasswordPage");

let forgotPasswordPage;

Given("I am on the Practo Login Page", async function () {
  forgotPasswordPage = new ForgotPasswordPage(this.page);
  await forgotPasswordPage.navigateTo();
});

When("I click on the forgot password link", async function () {
  await forgotPasswordPage.gotoForgotPasswordPage();
});

When("I enter the registered mobile number {string}", async function (mobileNumber) {
  await forgotPasswordPage.enterMobileNumber(mobileNumber);
});

When("I click the Send me instructions button", async function () {
  await forgotPasswordPage.clickOnSendMeInstructions();
});

Then("I should see the captcha challenge for password reset", async function () {
  const captchaWidget = this.page.locator('iframe[title="reCAPTCHA"]');

  await expect(captchaWidget).toBeVisible();
});
