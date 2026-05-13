const { When, Given } = require("@cucumber/cucumber");
const { VideoConsultPage } = require("../Pages/BookVideoConsultation.pages");
const fs = require("fs");
const path = require("path");

Given(
  "I load video consultation test data with id {string}",
  async function (testCaseId) {
    const dataFilePath = path.join(
      __dirname,
      "../test-data/bookVideoConsultation.json",
    );
    const testDataContent = fs.readFileSync(dataFilePath, "utf8");
    const testData = JSON.parse(testDataContent);

    const testCase = testData.testCases.find((tc) => tc.id === testCaseId);
    if (!testCase) {
      throw new Error(
        `Test case with id '${testCaseId}' not found in bookVideoConsultation.json`,
      );
    }

    // Store test data in context for use in subsequent steps
    this.videConsultData = testCase;
  },
);

When("user clicks on video consultation", async function () {
  const videoConsultPage = new VideoConsultPage(this.page);
  await videoConsultPage.clickVideoConsult();
});

When('user clicks on "See All Speciality"', async function () {
  const videoConsultPage = new VideoConsultPage(this.page);
  await videoConsultPage.clickSeeAllSpeciality();
});

When(
  "user enters symptom or health problem {string}",
  async function (symptom) {
    const videoConsultPage = new VideoConsultPage(this.page);
    await videoConsultPage.enterSymptom(symptom);
  },
);

When("user selects speciality {string}", async function (speciality) {
  const videoConsultPage = new VideoConsultPage(this.page);
  await videoConsultPage.selectSpeciality(speciality);
});

When("user clicks on Continue to Payment button", async function () {
  const videoConsultPage = new VideoConsultPage(this.page);
  await videoConsultPage.clickContinueToPaymentButton();
});

// Payment wrapper steps for JSON data
When("user enters payment details from loaded data", async function () {
  if (!this.videConsultData) {
    throw new Error(
      "Test data not loaded. Please use 'I load video consultation test data' step first.",
    );
  }

  const { cardHolderName, cardNumber, expiryMonth, cvv } = this.videConsultData;

  // Use the same element fills as CommonSteps does
  await this.page.fill("#name-on-card", cardHolderName);
  await this.page.fill("#card-number", cardNumber);
  await this.page.fill("#valid-upto", expiryMonth);
  await this.page.fill("#cvv", cvv);
});

When("take screenshot from loaded data", async function () {
  if (!this.videConsultData) {
    throw new Error(
      "Test data not loaded. Please use 'I load video consultation test data' step first.",
    );
  }

  const { screenshotName } = this.videConsultData;
  await this.page.screenshot({
    path: `screenshots/${screenshotName}`,
    fullPage: true,
  });
});
