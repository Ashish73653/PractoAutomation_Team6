const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const InstaPractoPage = require("../pages/InstaPractoPage");

let instaPage;

Given("the user accesses the Practo application", async function () {
    instaPage = new InstaPractoPage(this.page);

    await instaPage.openPractoWebsite("https://www.practo.com");
});

Given("the Practo landing screen is displayed properly", async function () {
    await instaPage.verifyHomepageLoaded();

    await expect(instaPage.page).toHaveURL(/practo/);
});

When("the user navigates to Insta by Practo section", async function () {
    await instaPage.openInstaPractoPage();

    await expect(instaPage.page).toHaveURL(/insta/);
});

When("the user selects the Plans option", async function () {
    await instaPage.clickSelectPlans();

    await expect(instaPage.nameInputTextField).toBeVisible();
});

When("the user provides demo username as {string}", async function (name) {
    await instaPage.enterName(name);

    await expect(instaPage.nameInputTextField).toHaveValue(name);
});

When(
    "the user provides demo email address as {string}",
    async function (email) {
        await instaPage.enterEmail(email);

        await expect(instaPage.emailInputTextField).toHaveValue(email);
    }
);

When(
    "the user provides demo phone number as {string}",
    async function (mobile) {
        await instaPage.enterMobileNumber(mobile);

        await expect(instaPage.mobileInputTextField).toHaveValue(mobile);
    }
);

When(
    "the user provides demo city name as {string}",
    async function (city) {
        await instaPage.enterCity(city);

        await expect(instaPage.cityInputTextField).toHaveValue(city);
    }
);

When("the user submits the Get Free Demo form", async function () {
    await instaPage.clickGetDemoButton();
});

Then(
    "the Insta by Practo demo form should be submitted successfully",
    async function () {
        await instaPage.verifySuccessMessageDisplayed();

        await expect(instaPage.successMessage).toBeVisible();
    }
);

Then(
    "the demo success confirmation message should appear",
    async function () {
        await expect(instaPage.successMessage).toContainText("Thank");
    }
);

Then(
    "the user captures screenshot of the demo confirmation page",
    async function () {
        await instaPage.captureScreenshot();
    }
);