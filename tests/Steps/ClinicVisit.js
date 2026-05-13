const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const { BookClinicVisit } = require("../Pages/ClinicVisit.pages");

let bookClinicVisit;

function getBookClinicVisit(page) {
  if (!bookClinicVisit || bookClinicVisit.page !== page) {
    bookClinicVisit = new BookClinicVisit(page);
  }

  return bookClinicVisit;
}

When("user clicks on location selector", async function () {
  await getBookClinicVisit(this.page).clickLocationSelector();
});

When("user enters location {string}", async function (locationName) {
  await getBookClinicVisit(this.page).enterLocation(locationName);
});

When(
  "user selects location {string} from suggestion list",
  async function (locationName) {
    await getBookClinicVisit(this.page).selectLocation(locationName);
  },
);

When("user clicks on hospital search bar", async function () {
  await getBookClinicVisit(this.page).clickHospitalSearchBar();
});

When("user clears content of hospital search bar", async function () {
  await getBookClinicVisit(this.page).clearHospitalSearchBar();
});

// ==========================
// Positive Scenario
// ==========================

When("user enters hospital name {string}", async function (hospitalName) {
  await getBookClinicVisit(this.page).enterHospitalName(hospitalName);
});

When(
  "user selects hospital {string} from suggestion list",
  async function (hospitalName) {
    await getBookClinicVisit(this.page).selectHospital(hospitalName);
  },
);

// ==========================
// Negative Scenario
// ==========================

When(
  "user enters invalid hospital name {string}",
  async function (hospitalName) {
    await getBookClinicVisit(this.page).searchInvalidHospitalName(hospitalName);
  },
);

When("user clicks on Doctors tab", async function () {
  await getBookClinicVisit(this.page).clickDoctorsTab();
});

When(
  "user clicks on speciality and selects {string}",
  async function (specialityName) {
    await getBookClinicVisit(this.page).selectSpeciality(specialityName);
  },
);

When("user clicks on Book Clinic Visit button", async function () {
  await getBookClinicVisit(this.page).clickBookClinicVisitButton();
});

When("user clicks on Tomorrow tab", async function () {
  await getBookClinicVisit(this.page).clickTomorrowTab();
});

When("user selects first slot from the time slots section", async function () {
  await getBookClinicVisit(this.page).selectFirstTimeSlot();
});

When(
  "user takes screenshot of the details page of that Doctors {string}",
  async function (screenshotName) {
    await getBookClinicVisit(this.page).takeDoctorDetailsScreenshot(
      screenshotName,
    );
  },
);

Then(
  "user should be able to see enabled Confirm Clinic Visit button",
  async function () {
    await getBookClinicVisit(this.page).verifyConfirmClinicVisitButtonEnabled();
  },
);

// =================================
// Negative Scenario Validations
// =================================

Then(
  "user should not see hospital {string} in suggestion list",
  async function (hospitalName) {
    await getBookClinicVisit(this.page).verifyHospitalNotVisible(hospitalName);
  },
);

Then('user should see "No results found" message', async function () {
  await getBookClinicVisit(this.page).verifyNoResultsMessage();
});

Then(
  "user should not be able to click on Book Clinic Visit button",
  async function () {
    await getBookClinicVisit(this.page).verifyBookClinicVisitButtonNotVisible();
  },
);
