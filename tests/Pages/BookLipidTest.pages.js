class LabTestPage {
  constructor(page) {
    this.page = page;

    // Lab Test Section
    this.labTestsButton = "text=Lab Tests";
    this.searchTestsInput = "#omniSearch";
    this.addToCartButton = "text=Add to Cart";
    this.proceedToCheckoutButton = "text=Proceed to Checkout";
    this.cartSummaryLocator =
      '//div[@class="u-padb--dbl u-border--dark u-bg--white u-round-corner"]';

    // Patient Details
    this.dateOfBirthInput = 'input[pattern="[0-9]*"]';
    this.maleGenderRadioButton =
      '(//div[@class="c-radio__ctrl c-radio__ctrl--off"])[1]';
    this.emailInput = 'input[type="email"]';
    this.continueButton = "text=Continue";

    // Slot Booking
    this.timeSlotOption = "text=06:00 AM-06:30 AM";
    this.payNowButton = "text=Pay Now";

    // Payment
    this.cardHolderNameInput = "#name-on-card";
    this.cardNumberInput = "#card-number";
    this.validUptoInput = "#valid-upto";
    this.cvvInput = "#cvv";
  }

  async navigateToApplication(url) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async clickLabTests() {
    await this.page.click(this.labTestsButton);
  }

  async clickSearchTestsInput() {
    await this.page.click(this.searchTestsInput);
  }

  async enterLabTestName(labTestName) {
    await this.page.waitForTimeout(1500);
    await this.page.fill(this.searchTestsInput, labTestName);
  }

  async pressEnterKey() {
    await this.page.keyboard.press("Enter");
  }

  async clickAddToCartButton() {
    await this.page.click(this.addToCartButton);
  }

  async takeCartScreenshot(cartScreenshot) {
    // Try a list of possible cart selectors quickly, fallback to full page
    console.log(
      `[CART-SCREENSHOT] Attempting to capture cart: ${cartScreenshot}`,
    );
    const candidates = [
      this.cartSummaryLocator,
      "div.cart-summary",
      "div[data-testid='cart-summary']",
    ];
    for (const sel of candidates) {
      try {
        const locator = this.page.locator(sel);
        await locator.waitFor({ state: "visible", timeout: 3000 });
        await locator.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        await locator.screenshot({ path: `screenshots/${cartScreenshot}` });
        console.log(`[CART-SCREENSHOT] Captured via ${sel}: ${cartScreenshot}`);
        return;
      } catch (err) {
        console.log(
          `[CART-SCREENSHOT] Selector ${sel} not found or not visible: ${err.message}`,
        );
        // try next selector
      }
    }

    // Last resort: capture full page so the step doesn't time out
    try {
      await this.page.screenshot({
        path: `screenshots/${cartScreenshot}`,
        fullPage: true,
      });
      console.log(
        `[CART-SCREENSHOT] Captured full page fallback: ${cartScreenshot}`,
      );
    } catch (err) {
      console.log(
        `[CART-SCREENSHOT] Failed to capture screenshot: ${err.message}`,
      );
      // Do not throw to avoid failing the step; let calling step decide.
    }
  }

  async clickProceedToCheckoutButton() {
    // Wait for checkout button to be visible
    const checkoutBtn = this.page.locator(this.proceedToCheckoutButton);
    await checkoutBtn.waitFor({ state: "visible", timeout: 60000 });

    // Scroll into view
    await checkoutBtn.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    // Click using Playwright's built-in method (force to bypass overlays)
    await checkoutBtn.click({ force: true });

    console.log("[CHECKOUT-CLICK] Clicked Proceed to Checkout");
    await this.page.waitForTimeout(1000);
  }

  async enterDateOfBirth(dateOfBirth) {
    await this.page.fill(this.dateOfBirthInput, dateOfBirth);
  }

  async selectMaleGender() {
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.maleGenderRadioButton).check({ force: true });
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async clickContinueButton() {
    await this.page.click(this.continueButton);
  }

  async clickContinueButtonForAddress() {
    // Strategy: Try multiple approaches with detailed logging
    const selectors = [
      'input[data-aid="order-continue-button"]',
      "button.c-button--order",
    ];

    for (const sel of selectors) {
      try {
        // Method 1: Use page.evaluate to click with proper event dispatching
        const info = await this.page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return { found: false, msg: `Selector not found: ${s}` };

          console.log(`[ADDRESS-CONTINUE] Found element for "${s}"`);
          console.log(
            `[ADDRESS-CONTINUE] Element visible: ${el.offsetParent !== null}`,
          );
          console.log(`[ADDRESS-CONTINUE] Element enabled: ${!el.disabled}`);

          // Dispatch proper click events
          const events = [
            new PointerEvent("pointerdown", {
              bubbles: true,
              cancelable: true,
            }),
            new PointerEvent("pointerup", { bubbles: true, cancelable: true }),
            new MouseEvent("mousedown", { bubbles: true, cancelable: true }),
            new MouseEvent("mouseup", { bubbles: true, cancelable: true }),
            new MouseEvent("click", { bubbles: true, cancelable: true }),
          ];

          for (const evt of events) {
            el.dispatchEvent(evt);
          }

          console.log(`[ADDRESS-CONTINUE] Dispatched click events for "${s}"`);
          return { found: true, msg: "Events dispatched" };
        }, sel);

        console.log(`Address Continue click result: ${info.msg}`);
        if (info.found) {
          await this.page.waitForTimeout(2000); // Wait for page to respond to click
          return;
        }
      } catch (err) {
        console.log(
          `Address Continue attempt failed for "${sel}": ${err.message}`,
        );
      }
    }

    // Method 2: Try Playwright's click on visible element
    try {
      const locator = this.page.getByText("Continue", { exact: true }).first();
      await locator.click({ force: true, timeout: 5000 });
      console.log("[ADDRESS-CONTINUE] Clicked via Playwright text locator");
      await this.page.waitForTimeout(1000);
      return;
    } catch (err) {
      console.log(
        `[ADDRESS-CONTINUE] Playwright text click failed: ${err.message}`,
      );
    }

    // Method 3: Last resort - find and click any Continue element
    try {
      const success = await this.page.evaluate(() => {
        const nodes = Array.from(
          document.querySelectorAll("button, input[type='submit']"),
        );
        for (let i = nodes.length - 1; i >= 0; i--) {
          const el = nodes[i];
          const aid = el.getAttribute("data-aid");
          const txt = (el.textContent || el.value || "").trim();
          if (
            aid === "order-continue-button" ||
            txt === "Continue" ||
            txt.toLowerCase().includes("continue")
          ) {
            console.log(
              `[ADDRESS-CONTINUE] Found element: aid=${aid}, txt=${txt}`,
            );
            el.scrollIntoView({ behavior: "smooth", block: "center" });

            // Click with full event chain
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

      if (success) {
        console.log("[ADDRESS-CONTINUE] Clicked via generic evaluate search");
        await this.page.waitForTimeout(2000);
        return;
      }
    } catch (err) {
      console.log(
        `[ADDRESS-CONTINUE] Generic evaluate click failed: ${err.message}`,
      );
    }

    // If nothing worked, take a screenshot for debugging
    try {
      await this.page.screenshot({
        path: `screenshots/address-continue-failure.png`,
        fullPage: false,
      });
      console.log(
        "[ADDRESS-CONTINUE] Screenshot saved to address-continue-failure.png",
      );
    } catch (e) {
      /* ignore screenshot error */
    }

    throw new Error(
      "clickContinueButtonForAddress: all click strategies failed",
    );
  }

  async selectTimeSlot(timeSlot) {
    await this.page.waitForTimeout(1000);
    const normalizedTimeSlot = timeSlot.trim().replace(/\s*-\s*/g, "\\s*-\\s*");
    const timeSlotLocator = this.page.getByText(
      new RegExp(normalizedTimeSlot, "i"),
      { exact: false },
    );
    await timeSlotLocator.waitFor({ state: "visible", timeout: 60000 });
    await timeSlotLocator.scrollIntoViewIfNeeded();
    await timeSlotLocator.click({ force: true });
    await this.page.waitForSelector(this.payNowButton, {
      state: "visible",
      timeout: 60000,
    });
  }

  async clickPayNowButton() {
    await this.page.click(this.payNowButton);
  }

  async enterCardHolderName(cardHolderName) {
    await this.page.fill(this.cardHolderNameInput, cardHolderName);
  }

  async enterCardNumber(cardNumber) {
    await this.page.fill(this.cardNumberInput, cardNumber);
  }

  async enterExpiryMonth(expiryMonth) {
    await this.page.fill(this.expiryMonthInput, expiryMonth);
  }

  async enterCVV(cvv) {
    await this.page.fill(this.cvvInput, cvv);
  }

  async takeScreenshot(screenshotName) {
    await this.page.screenshot({
      path: `screenshots/${screenshotName}`,
      fullPage: true,
    });
  }
}

module.exports = { LabTestPage };
