const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LabTestPage } = require("../Pages/BookLipidTest.pages");

Given("user opens the application URL {string}", async function (url) {
  await this.page.goto(url, { waitUntil: "domcontentloaded" });
});

When('user clicks on "Lab Tests"', async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.clickLabTests();
});

When(
  'user is on "Lab Tests" page just click escape key to close any location popups',
  async function () {
    await this.page.waitForTimeout(5000); // wait for potential popups to appear
    await this.page.keyboard.press("Escape");
  },
);

When("user clicks on search tests input", async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.clickSearchTestsInput();
});

When("user enters lab test name {string}", async function (labTestName) {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.enterLabTestName(labTestName);
});

When("user presses Enter key", async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.pressEnterKey();
});

When("user clicks on Add to Cart button", async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.clickAddToCartButton();
});

When("user takes screenshot of cart {string}", async function (cartScreenshot) {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.takeCartScreenshot(cartScreenshot);
});

When("user clicks on Proceed to Checkout button", async function () {
  const openPages = this.context.pages().filter((page) => !page.isClosed());
  const activePage = openPages[openPages.length - 1] || this.page;
  this.page = activePage;
  const {
    LabTestPage: MostBookedLabTestPage,
  } = require("../Pages/MostBookedTest.pages");
  const labTestPage = new MostBookedLabTestPage(this.page);
  await labTestPage.clickProceedToCheckoutButton();
});

When("user enters date of birth {string}", async function (dateOfBirth) {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.enterDateOfBirth(dateOfBirth);
});

When("user selects gender as {string}", async function (gender) {
  const labTestPage = new LabTestPage(this.page);
  if (gender.toLowerCase() === "male") {
    await labTestPage.selectMaleGender();
    return;
  }

  await this.page.check(`input[value="${gender}"]`);
});

When("user enters email id {string}", async function (email) {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.enterEmail(email);
});

When("user clicks on Continue button for selected address", async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.clickContinueButtonForAddress();
  await this.page.waitForTimeout(2000);
  const openPages = this.context.pages().filter((page) => !page.isClosed());
  this.page = openPages[openPages.length - 1] || this.page;

  await Promise.race([
    this.page
      .getByText(/06:00 AM\s*-\s*06:30 AM/i)
      .first()
      .waitFor({ state: "visible", timeout: 15000 }),
    this.page
      .locator("text=Pay Now")
      .first()
      .waitFor({ state: "visible", timeout: 15000 }),
  ]).catch(() => {});
});

When("user selects first time slot {string}", async function (timeSlot) {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.selectTimeSlot(timeSlot);
});

When("user clicks on Pay Now button", async function () {
  const labTestPage = new LabTestPage(this.page);
  await labTestPage.clickPayNowButton();
});

When("user clicks on Continue button", async function () {
  const selectors = [
    'input[data-aid="order-continue-button"]',
    "button.c-button--order",
  ];

  for (const sel of selectors) {
    try {
      const success = await this.page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return false;

        console.log(`[CONTINUE-CLICK] Found element for "${s}"`);

        // Dispatch proper click events instead of just calling .click()
        el.dispatchEvent(
          new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
          }),
        );
        el.dispatchEvent(
          new PointerEvent("pointerup", { bubbles: true, cancelable: true }),
        );
        el.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
        );
        el.dispatchEvent(
          new MouseEvent("mouseup", { bubbles: true, cancelable: true }),
        );
        el.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true }),
        );

        console.log(`[CONTINUE-CLICK] Dispatched events for "${s}"`);
        return true;
      }, sel);

      if (success) {
        await this.page.waitForTimeout(1000);
        console.log("[CONTINUE-CLICK] Click successful");
        return;
      }
    } catch (err) {
      console.log(
        `[CONTINUE-CLICK] Attempt failed for "${sel}": ${err.message}`,
      );
    }
  }

  // Fallback: Try generic text-based click
  try {
    const found = await this.page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll("button, input"));
      for (let i = nodes.length - 1; i >= 0; i--) {
        const el = nodes[i];
        const aid = el.getAttribute("data-aid");
        const txt = (el.textContent || el.value || "").trim();
        if (
          aid === "order-continue-button" ||
          txt === "Continue" ||
          txt.toLowerCase().includes("continue")
        ) {
          console.log(`[CONTINUE-CLICK] Generic: found aid=${aid}, txt=${txt}`);

          // Full event chain
          el.dispatchEvent(
            new PointerEvent("pointerdown", {
              bubbles: true,
              cancelable: true,
            }),
          );
          el.dispatchEvent(
            new PointerEvent("pointerup", {
              bubbles: true,
              cancelable: true,
            }),
          );
          el.dispatchEvent(
            new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
          );
          el.dispatchEvent(
            new MouseEvent("mouseup", { bubbles: true, cancelable: true }),
          );
          el.dispatchEvent(
            new MouseEvent("click", { bubbles: true, cancelable: true }),
          );

          return true;
        }
      }
      return false;
    });

    if (found) {
      await this.page.waitForTimeout(1000);
      console.log("[CONTINUE-CLICK] Generic click successful");
      return;
    }
  } catch (err) {
    console.log(`[CONTINUE-CLICK] Generic fallback failed: ${err.message}`);
  }

  throw new Error(
    "user clicks on Continue button: failed to click Continue button",
  );
});

When("user enters card holder name {string}", async function (cardHolderName) {
  await this.page.fill("#name-on-card", cardHolderName);
});

When("user enters debit card number {string}", async function (cardNumber) {
  await this.page.fill("#card-number", cardNumber);
});

When("user enters expiry month {string}", async function (expiryMonth) {
  await this.page.fill("#valid-upto", expiryMonth);
});

When("user enters CVV {string}", async function (cvv) {
  await this.page.fill("#cvv", cvv);
});

Then("user should be able to proceed successfully", async function () {
  await expect(this.page).toHaveURL(/payment|checkout|confirmation|consult/);
});

Then("take screenshot {string}", async function (screenshotName) {
  await this.page.screenshot({
    path: `screenshots/${screenshotName}`,
    fullPage: true,
  });
});
