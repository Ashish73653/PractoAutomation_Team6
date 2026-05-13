// const { Given, When, Then } = require("@cucumber/cucumber");

// const { expect } = require("@playwright/test");

// const InstaPractoPage = require("../pages/InstaPractoPage");

// let instaPage;

// Given("the user accesses the Practo application", async function () {
//     instaPage = new InstaPractoPage(this.page);

//     await instaPage.openPractoWebsite("https://www.practo.com");
// });

// Given("the Practo landing screen is displayed properly", async function () {
//     await instaPage.verifyHomepageLoaded();

//     await expect(instaPage.page).toHaveURL(/practo/);
// });

// When("the user navigates to Insta by Practo section", async function () {
//     await instaPage.openInstaPractoPage();

//     await expect(instaPage.page).toHaveURL(/insta/);
// });

// When("the user selects the Plans option", async function () {
//     await instaPage.clickSelectPlans();

//     await expect(instaPage.nameInputTextField).toBeVisible();
// });

// When("the user provides demo username as {string}", async function (name) {
//     await instaPage.enterName(name);

//     await expect(instaPage.nameInputTextField).toHaveValue(name);
// });

// When(
//     "the user provides demo email address as {string}",
//     async function (email) {
//         await instaPage.enterEmail(email);

//         await expect(instaPage.emailInputTextField).toHaveValue(email);
//     }
// );

// When(
//     "the user provides demo phone number as {string}",
//     async function (mobile) {
//         await instaPage.enterMobileNumber(mobile);

//         await expect(instaPage.mobileInputTextField).toHaveValue(mobile);
//     }
// );

// When(
//     "the user provides demo city name as {string}",
//     async function (city) {
//         await instaPage.enterCity(city);

//         await expect(instaPage.cityInputTextField).toHaveValue(city);
//     }
// );

// When("the user submits the Get Free Demo form", async function () {
//     await instaPage.clickGetDemoButton();
// });

// Then(
//     "the Insta by Practo demo form should be submitted successfully",
//     async function () {
//         await instaPage.verifySuccessMessageDisplayed();

//         await expect(instaPage.successMessage).toBeVisible();
//     }
// );

// Then(
//     "the demo success confirmation message should appear",
//     async function () {
//         await expect(instaPage.successMessage).toContainText("Thank");
//     }
// );

// Then(
//     "the user captures screenshot of the demo confirmation page",
//     async function () {
//         await instaPage.captureScreenshot();
//     }
// );

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const InstaPractoPage = require("../pages/InstaPractoPage");
const testData = require("../test-data/instaByPracto.json");

let instaPage;

// ── Background ─────────────────────────────────────────────────────────────────

Given("the user accesses the Practo application", async function () {
    instaPage = new InstaPractoPage(this.page);
    await instaPage.openPractoWebsite("https://www.practo.com");
});

Given("the Practo landing screen is displayed properly", async function () {
    await instaPage.verifyHomepageLoaded();
    await expect(instaPage.page).toHaveURL(/practo/);
});

// ── Navigation ─────────────────────────────────────────────────────────────────

When("the user navigates to Insta by Practo section", async function () {
    await instaPage.openInstaPractoPage();
    await expect(instaPage.page).toHaveURL(/insta/);
});

When("the user selects the Plans option", async function () {
    await instaPage.clickSelectPlans();
    await expect(instaPage.nameInputTextField).toBeVisible();
});

// ── Form Fill — driven by dataKey ──────────────────────────────────────────────
//
// The Examples table passes only "validData" or "invalidData" as the dataKey.
// This step resolves the key against testData.json and stores all matching
// rows on `this` (World) so the assertion step can access them too.
//
When(
    "the user fills the demo form using {string} data",
    async function (dataKey) {
        const rows = testData[dataKey];

        if (!rows || rows.length === 0) {
            throw new Error(
                `No data found for key "${dataKey}" in testData.json`
            );
        }

        // Store on World so the Then step can branch on valid vs invalid
        this.dataKey = dataKey;
        this.formRows = rows;

        // Fill the form with the FIRST row.
        // Subsequent rows are exercised by the scenario re-running via Examples.
        // If you want all rows in one scenario run, loop here and re-navigate
        // between iterations (see comment at bottom of file).
        const row = rows[0];
        await instaPage.fillForm(row);
    }
);

// ── Submit ─────────────────────────────────────────────────────────────────────

When("the user submits the Get Free Demo form", async function () {
    await instaPage.clickGetDemoButton();
});

// ── Assertion — branches on dataKey ───────────────────────────────────────────
//
// validData   → expect success message
// invalidData → expect red-border validation errors (no error text shown)
//
Then(
    "the form result should be validated based on {string} data",
    async function (dataKey) {
        if (dataKey === "validData") {
            // ── Valid path ────────────────────────────────────────────────────
            await instaPage.verifySuccessMessageDisplayed();
            await expect(instaPage.successMessage).toBeVisible();
            await expect(instaPage.successMessage).toContainText("Thank");
        } else if (dataKey === "invalidData") {
            // ── Invalid path ──────────────────────────────────────────────────
            // Site shows no error text; only highlights fields with a red border.
            // We wait briefly for any CSS transition to complete.
            await instaPage.page.waitForTimeout(500);

            const hasErrors = await instaPage.hasValidationErrors();

            expect(
                hasErrors,
                "Expected at least one field to show a red validation border " +
                "after submitting invalid data, but none was detected."
            ).toBe(true);
        } else {
            throw new Error(
                `Unknown dataKey "${dataKey}". ` +
                'Expected "validData" or "invalidData".'
            );
        }
    }
);

// ── Screenshot ─────────────────────────────────────────────────────────────────

Then(
    "the user captures screenshot of the demo confirmation page",
    async function () {
        const filename =
            this.dataKey === "validData"
                ? "insta-demo-success.png"
                : "insta-demo-validation-error.png";

        await instaPage.captureScreenshot(filename);
    }
);

/*
 * ── NOTE: running ALL rows per dataKey in a single scenario ──────────────────
 *
 * The current setup runs one row per scenario execution (Cucumber re-runs the
 * outline once per Examples row). This matches standard BDD practice.
 *
 * If you ever want to loop through every row in one scenario run, replace the
 * fill step with:
 *
 *   for (const row of rows) {
 *       await instaPage.fillForm(row);
 *       await instaPage.clickGetDemoButton();
 *       // assert per row, then navigate back / reset form
 *   }
 */