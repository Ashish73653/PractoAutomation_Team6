const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const RegistrationPage = require("../Pages/registrationPage");

let registrationPage;

Given("I am on the Practo Registration page", async function () {
  registrationPage = new RegistrationPage(this.page);
  await registrationPage.navigateTo();
});

When(
  "I enter registration details {string}, {string} and {string}",
  async function (fullName, mobileNumber, password) {
    await registrationPage.fillRegistrationForm(
      fullName,
      mobileNumber,
      password,
    );
  },
);

When("I click the Send OTP button", async function () {
  await registrationPage.clickSendOtp();
});

Then("I should see {string} for registration", async function (expectedResult) {
  const actualResult = await registrationPage.getRegistrationResult();
  console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
  expect(actualResult).toBe(expectedResult);
});
