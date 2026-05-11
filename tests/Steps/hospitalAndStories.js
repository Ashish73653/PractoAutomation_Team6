const { When, Then } = require("@cucumber/cucumber");
const HospitalAndStoriesPage = require("../Pages/hospitalAndStories.page.js");
const { takePageScreenshot } = require("../util/takeScreenshots.js");

let hospitalPage;

When("fill location as {string}", async function (location) {
    hospitalPage = new HospitalAndStoriesPage(this.page);
    await hospitalPage.enterLocation(location);
});

When("fill hospital name {string}", async function (hospitalName) {
    await hospitalPage.enterHospitalName(hospitalName);
});

When("search hospital name", async function () {
    await hospitalPage.selectHospital();
});

When("click on doctors", async function () {
    await hospitalPage.clickOnDoctors();
});

When("search field {string}", async function (speciality) {
    // Reuse from findDoctor steps if shared, 
    await hospitalPage.selectPediatrician();
});

When("Search for dr name {string}", async function (doctorName) {
    await hospitalPage.searchDoctorByName(doctorName);
});

When("click on view profile", async function () {
    // Handle new tab opening
    const newPagePromise = this.context.waitForEvent("page", { timeout: 10000 }).catch(() => null);

    await hospitalPage.clickViewProfile();

    const newPage = await newPagePromise;

    if (newPage) {
        await newPage.waitForLoadState("domcontentloaded");
        await newPage.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
        this.page = newPage;
    } else {
        await this.page.waitForLoadState("domcontentloaded");
    }
    //reinitializing the page object with new constructor to reflect the new page context
    hospitalPage = new HospitalAndStoriesPage(this.page);
});

When("click Share your story", async function () {
    await hospitalPage.clickShareStory();
    await this.page.waitForLoadState("domcontentloaded");
    hospitalPage = new HospitalAndStoriesPage(this.page);
});

When("click on recommend the doctor", async function () {
    await hospitalPage.clickRecommendDoctor();
});

When("fill the treatment for which you visited {string}", async function (treatment) {
    await hospitalPage.fillTreatment(treatment);
});

When("fill checkbox for How long you waited for doctor {string}", async function (waitingTime) {
    await hospitalPage.chooseWaitTime();
});

When("fill What were you most happy with {string}", async function (happyWith) {
    await hospitalPage.chooseHappyWith();
});

When("fill the experience with the doctor {string}", async function (experience) {
    await hospitalPage.fillExperience(experience);
});

When("click on keep my feedback story anonymous", async function () {
    await hospitalPage.keepAnonymous();
});

Then("verify by taking screenshot of the form filled", async function () {
    await this.page.waitForTimeout(1000);
    await takePageScreenshot("hospital_story_form.png", this.page);
});