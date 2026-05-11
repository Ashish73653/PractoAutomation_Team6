const { chromium } = require("@playwright/test");
const { Given, Then } = require("@cucumber/cucumber");
const FindDoctorPage = require("../Pages/findDoctor.page.js");
const { takePageScreenshot } = require("../util/takeScreenshots.js");

let findDoctorPage;

function getPageObject(page) {
  findDoctorPage = new FindDoctorPage(page);
  return findDoctorPage;
}

Given("Navigate to {string}", async function (url) {
  if (!this.page || this.page.isClosed()) {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false });
    }

    try {
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } catch {
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
  }

  await this.page.goto(url);
  findDoctorPage = getPageObject(this.page);
});

Then("click on Find Doctor", async function () {
  await findDoctorPage.clickOnFindDoctor();
});

Then("fill location as bangalore", async function () {
  await findDoctorPage.enterLocation("bangalore");
});

Then("fill speciality {string}", async function (speciality) {
  await findDoctorPage.enterSpeciality(speciality);
});

Then("search speciality {string}", async function (speciality) {
  await findDoctorPage.selectSpeciality();
});

Then("select Gender {string}", async function (gender) {
  await findDoctorPage.selectGender();
  
  if (gender.toLowerCase() === 'female') {
    await findDoctorPage.selectFemale();
  }
});

Then("select Experience {string}", async function (experience) {
  await findDoctorPage.selectExperience();
  await findDoctorPage.selectExperienceOption();
});

Then("select Sort By {string}", async function (sortOption) {
  await findDoctorPage.selectSortBy();
  await findDoctorPage.selectLowestPrice();
});

Then("select the first doctor", async function () {
  // Wait for new page 
  const newPagePromise = this.context.waitForEvent('page');
  
  await findDoctorPage.clickOnDoctor();

  const newPage = await newPagePromise;
  await newPage.waitForLoadState();

  this.page = newPage;
  findDoctorPage = new FindDoctorPage(newPage);
});

Then("click on Book Appointment", async function () {
    await this.page.waitForLoadState('domcontentloaded');
    await findDoctorPage.bookDoctor();
    // let element load
    await this.page.waitForTimeout(2000);
});
Then("Select first available time slot", async function () {
    await findDoctorPage.selectFirstAvailableTimeSlot();
});

Then("fill valid email address {string}", async function (email) {
  await findDoctorPage.enterEmail(email);
});

Then("disable the {string} notifications", async function (notificationType) {
  if (notificationType.toLowerCase() === 'whatsapp') {
    await findDoctorPage.disableWhatsappNotification();
  }
});

Then("Verify by taking screenshot of the booking details appointment page", async function () {
  await takePageScreenshot("booking_details.png", this.page);
});

