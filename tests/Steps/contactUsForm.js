
const { Given, When, Then } = require("@cucumber/cucumber");
const ContactUsFormPage = require("../Pages/ContactUsFormPage");

let contactUsPage;

Given("the user opens the Practo site", async function () {
  contactUsPage = new ContactUsFormPage(this.page);
  await contactUsPage.openPractoWebsite("https://www.practo.com");
});

Given("the Practo homepage loads successfully", async function () {
  await contactUsPage.verifyHomepageLoaded();
});

When(
  "the user navigates to the Contact Us page in a separate tab",
  async function () {
    await contactUsPage.openContactUsPageInNewTab();
  },
);

When(
  "the user chooses {string} from the Interested In dropdown menu",
  async function (interest) {
    await contactUsPage.selectInterest(interest);
  },
);

When("the user enters {string} into the Name field", async function (name) {
  await contactUsPage.enterName(name);
});

When(
  "the user enters {string} into the Mobile Number field",
  async function (mobile) {
    await contactUsPage.enterMobileNumber(mobile);
  },
);

When("the user enters {string} into the Email field", async function (email) {
  await contactUsPage.enterEmail(email);
});

Then(
  "the Country field should be auto-filled with {string}",
  async function (country) {
    await contactUsPage.verifyCountry(country);
  },
);

When("the user enters {string} into the City field", async function (city) {
  await contactUsPage.enterCity(city);
});

When(
  "the user enters {string} into the Message field",
  async function (message) {
    await contactUsPage.enterMessage(message);
  },
);

When("the user clicks the Submit button", async function () {
  await contactUsPage.clickSubmitButton();
});

// ── Positive steps ─────────────────────────────────────────
Then("the Contact Us form should be submitted successfully", async function () {
  await contactUsPage.verifyContactRequestSubmitted();
});

Then(
  "the user captures a screenshot of the successful submission",
  async function () {
    await contactUsPage.captureScreenshot("contact-us-success");
  },
);

// ── Negative steps ─────────────────────────────────────────
Then("the Contact Us form should not be submitted", async function () {
  await contactUsPage.verifyFormNotSubmitted();
});

Then("the user should see the validation error {string}", async function (errormessage) {
  await contactUsPage.verifyValidationError();
});


Then(
  "the user captures a screenshot of the validation error",
  async function () {
    await contactUsPage.captureScreenshot("contact-us-error");
  },
);