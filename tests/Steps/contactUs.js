const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const ContactUsPage = require("../pages/ContactUsPage");

let contactPage;

Given("the user launches the Practo website", async function () {
  contactPage = new ContactUsPage(this.page);

  await contactPage.openPractoWebsite("https://www.practo.com");
});

Given("the Practo homepage is displayed properly", async function () {
  await contactPage.verifyHomepageLoaded();

  await expect(contactPage.page).toHaveURL(/practo/);
});

When("the user opens the Contact Us page in a new tab", async function () {
  await contactPage.openContactUsPageInNewTab();

  await expect(contactPage.page).toHaveURL(/contact/);
});

When(
  "the user selects {string} from Interested In dropdown",
  async function (interest) {
    await contactPage.selectInterest(interest);

    await expect(contactPage.interestDropdown).toHaveValue(/hospital/i);
  },
);

When("the user enters contact name as {string}", async function (name) {
  await contactPage.enterName(name);

  await expect(contactPage.nameInputTextField).toHaveValue(name);
});

When(
  "the user enters contact mobile number as {string}",
  async function (mobile) {
    await contactPage.enterMobileNumber(mobile);

    await expect(contactPage.mobileInputTextField).toHaveValue(mobile);
  },
);

When("the user enters contact email as {string}", async function (email) {
  await contactPage.enterEmail(email);

  await expect(contactPage.emailInputTextField).toHaveValue(email);
});

Then("the country field should display {string}", async function (country) {
  await contactPage.verifyCountry(country);

  await expect(contactPage.countryDropdown).toHaveValue(country);
});

When("the user enters city as {string}", async function (city) {
  await contactPage.enterCity(city);

  await expect(contactPage.cityInputTextField).toHaveValue(city);
});

When("the user enters message as {string}", async function (message) {
  await contactPage.enterMessage(message);

  await expect(contactPage.messageTextArea).toHaveValue(message);
});

When("the user clicks on the Submit button", async function () {
  await contactPage.clickSubmitButton();
});

Then("the contact request should be submitted successfully", async function () {
  await contactPage.verifyContactRequestSubmitted();

  await expect(contactPage.successMessage).toBeVisible();
});

Then(
  "a screenshot of the submitted contact form is captured",
  async function () {
    await contactPage.captureScreenshot();
  },
);