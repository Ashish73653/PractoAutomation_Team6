const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const SurgeryAppointmentPage = require("../Pages/SurgeryAppointmentPage");

let surgeryPage;

Given("the user opens the Practo website", async function () {
  surgeryPage = new SurgeryAppointmentPage(this.page);

  await surgeryPage.openPractoWebsite("https://www.practo.com");

  await expect(this.page).toHaveURL(/practo\.com/);
});

Given("the Practo landing page is displayed successfully", async function () {
  await surgeryPage.verifyHomepageLoaded();

  await expect(this.page).toHaveTitle(/Practo/i);
});

When("the user opens the Surgeries category", async function () {
  await surgeryPage.navigateToSurgeryAppointment();

  await expect(this.page).toHaveURL(/care|surgery/i);
});

When("the user chooses city as {string}", async function (city) {
  await this.page.waitForTimeout(3000);
  await surgeryPage.selectCityFromDropdown(city);
});

When("the user chooses ailment as {string}", async function (ailment) {
  await surgeryPage.selectAilmentFromDropdown(ailment);
});

When("the user enters patient name as {string}", async function (username) {
  await surgeryPage.enterPatientName(username);
});

When("the user enters phone number as {string}", async function (mobile) {
  await surgeryPage.enterMobileNumber(mobile);
});

When("the user clicks the Book Appointment button", async function () {
  await surgeryPage.clickBookAppointmentButton();
});

Then("the booking confirmation popup should appear", async function () {
  await surgeryPage.verifyCongratulationsPopup();

  await expect(surgeryPage.congratulationsPopup).toBeVisible();
});

Then("a screenshot of the booking confirmation is captured", async function () {
  await surgeryPage.captureScreenshot();
});