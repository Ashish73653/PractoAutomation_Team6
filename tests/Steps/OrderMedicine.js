// const { Given, When, Then } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");
// const { OrderMedicinePage } = require("../pages/OrderMedicinePage");

// let orderMedicinePage;

// Given("the user navigates to {string}", async function (url) {
//   await this.page.goto(url, { waitUntil: "domcontentloaded" });
// });

// Given("the Practo homepage is loaded successfully", async function () {
//   await expect(this.page).toHaveURL(/practo\.com/);
// });

// When("the user navigates to the {string} section", async function (section) {
//   this.orderMedicinePage = new OrderMedicinePage(this.page);

//   if (section === "Order Medicine") {
//     await this.orderMedicinePage.navigateToOrderMedicine();
//   } else {
//     throw new Error(`Unknown section: "${section}"`);
//   }
// });

// When("the user searches for {string} using Tab and Enter",
//   async function (medicineName) {
//     await this.orderMedicinePage.searchMedicine(medicineName);
//     await this.page.waitForLoadState("networkidle");
//   },
// );

// When("the user adds {int} strips of Pacimol to the cart",
//   async function (quantity) {
//     await this.orderMedicinePage.addMedicineToCart(quantity);
//     await this.page.waitForLoadState("networkidle");
//   },
// );

// When("the user clicks on Place Order", async function () {
//   await this.orderMedicinePage.checkout();
//   await this.page.waitForLoadState("networkidle");
// });

// Then("the payment gateway page should open with a valid order summary",
//   async function () {
//     await expect(this.page).toHaveURL(/payment|checkout|order-summary|pay/i, {
//       timeout: 5000,
//     });
//   },
// );

// Then("a screenshot of the payment gateway page is captured", async function () {
//   await this.orderMedicinePage.takeScreenshot();
// });

const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const { OrderMedicinePage } = require("../pages/OrderMedicinePage");

let orderMedicinePage;

Given("the user navigates to {string}", async function (url) {
  await this.page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  await expect(this.page).toHaveURL(/practo\.com/);
});

Given("the Practo homepage is loaded successfully", async function () {
  await expect(this.page).toHaveTitle(/Practo/i);
});

When("the user navigates to the {string} section", async function (section) {
  this.orderMedicinePage = new OrderMedicinePage(this.page);

  if (section === "Order Medicine") {
    await this.orderMedicinePage.navigateToOrderMedicine();

    // await expect(this.page).toHaveURL(/medicine/i);
  } else {
    throw new Error(`Unknown section: "${section}"`);
  }
});

When(
  "the user searches for {string} using Tab and Enter",
  async function (medicineName) {
    await this.orderMedicinePage.searchMedicine(medicineName);

    await this.page.waitForLoadState("networkidle");
  },
);

When(
  "the user adds {int} strips of Pacimol to the cart",
  async function (quantity) {
    await this.orderMedicinePage.addMedicineToCart(quantity);

    await this.page.waitForLoadState("networkidle");
  },
);

When("the user clicks on Place Order", async function () {
  await this.orderMedicinePage.checkout();

  await this.page.waitForLoadState("networkidle");
});

Then(
  "the payment gateway page should open with a valid order summary",
  async function () {
    await expect(this.page).toHaveURL(/payment|checkout|order-summary|pay/i, {
      timeout: 5000,
    });
  },
);

Then("a screenshot of the payment gateway page is captured", async function () {
  await this.orderMedicinePage.takeScreenshot();
});