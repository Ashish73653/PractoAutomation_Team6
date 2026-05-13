const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const ContactUsPage = require("../Pages/contactUsPage");

let contactUsPage;
let contactUsTab;

Given("the user launches the Practo website", async function () {
  await this.page.goto("https://www.practo.com/", {
    waitUntil: "domcontentloaded",
  });
});

Given("the Practo homepage is displayed properly", async function () {
  await expect(this.page.getByRole("textbox", { name: /Search location/i })).toBeVisible();
  await expect(
    this.page.getByRole("heading", { name: /Consult top doctors online/i }),
  ).toBeVisible();
});

When("the user opens the Contact Us page in a new tab", async function () {
  contactUsTab = await this.context.newPage();
  contactUsTab.setDefaultTimeout(60000);
  this.page = contactUsTab;
  contactUsPage = new ContactUsPage(this.page);
  await contactUsPage.openContactUsForm();
});

When(
  "the user selects {string} from Interested In dropdown",
  async function (interest) {
    await contactUsPage.selectByVisibleText(
      contactUsPage.interestedInDropdown,
      interest,
    );
  },
);

When("the user enters contact name as {string}", async function (name) {
  await contactUsPage.nameInput.fill(name);
});

When(
  "the user enters contact mobile number as {string}",
  async function (mobileNumber) {
    await contactUsPage.mobileInput.fill(mobileNumber);
  },
);

When("the user enters contact email as {string}", async function (email) {
  await contactUsPage.emailInput.fill(email);
});

Then("the country field should display {string}", async function (country) {
  await contactUsPage.selectByVisibleText(contactUsPage.countryDropdown, country);

  const selectedCountry = await contactUsPage.countryDropdown
    .locator("option:checked")
    .textContent();

  expect(selectedCountry.trim()).toContain(country);
});

When("the user enters city as {string}", async function (city) {
  await contactUsPage.cityInput.fill(city);
});

When("the user enters message as {string}", async function (message) {
  await contactUsPage.messageInput.fill(message);
});

When("the user clicks on the Submit button", async function () {
  await contactUsPage.submitForm();
});

Then("the contact request should be submitted successfully", async function () {
  await contactUsPage.verifySubmitAttempt();
});

Then("a screenshot of the submitted contact form is captured", async function () {
  await contactUsPage.verifySubmitAttempt();
});

Given("I open the Practo Help page from Security and help", async function () {
  contactUsPage = new ContactUsPage(this.page);
  await contactUsPage.navigateThroughSecurityHelp();
});

When("I open the Contact Us form", async function () {
  await contactUsPage.openContactUsForm();
});

When(
  "I fill the contact us form with {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}",
  async function (
    name,
    mobileNumber,
    email,
    country,
    city,
    interestedIn,
    ownsClinic,
    userType,
    message,
  ) {
    await contactUsPage.fillContactForm({
      name,
      mobileNumber,
      email,
      country,
      city,
      interestedIn,
      ownsClinic,
      userType,
      message,
    });
  },
);

When("I submit the contact us form", async function () {
  await contactUsPage.submitForm();
});

Then("the contact us submit attempt should be captured", async function () {
  await contactUsPage.verifySubmitAttempt();
});
