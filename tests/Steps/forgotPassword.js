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

When("I enter the OTP that I received", async function () {
  const otp = process.env.PRACTO_OTP || "000000";
  await forgotPasswordPage.enterOtp(otp);
});

When("I click on Login Button", async function () {
  await forgotPasswordPage.clickOnLoginBtn();
});

When("I write the New Password {string}", async function (newPassword) {
  await forgotPasswordPage.enterNewPassword(newPassword);
});

When(
  "I write the confirm New Password {string}",
  async function (confirmNewPassword) {
    await forgotPasswordPage.enterConfirmNewPassword(confirmNewPassword);
  },
);

When("I click the Change Password button", async function () {
  await forgotPasswordPage.clickOnChangePassword();
});

Then("I should see the message {string}", async function (expectedMessage) {
  const actualMessage = await forgotPasswordPage.getResultMessage(expectedMessage);
  expect(actualMessage).toContain(expectedMessage);
});
