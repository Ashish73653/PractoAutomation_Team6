const { When } = require("@cucumber/cucumber");
const { VideoConsultPage } = require("../Pages/BookVideoConsultation.pages");

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
