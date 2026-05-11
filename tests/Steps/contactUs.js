const { Given, When, Then } = require("@cucumber/cucumber");
const ContactUsPage = require("../Pages/contactUsPage");

let contactUsPage;

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
