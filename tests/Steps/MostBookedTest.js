const { When } = require("@cucumber/cucumber");
const { LabTestPage } = require("../Pages/MostBookedTest.pages");

When(
  "user is on Lab Tests page just click escape key to close any location popups",
  async function () {
    const labTestPage = new LabTestPage(this.page);
    await labTestPage.page.keyboard.press("Escape");
  },
);

When(
  "user clicks on 1st item to add to cart in top booked test",
  async function () {
    const clickfirstAddToCartButton = new LabTestPage(this.page);
    await clickfirstAddToCartButton.clickFirstAddToCartButton();
  },
);

When(
  "user clicks on 5th item to add to cart in top booked test",
  async function () {
    const clickfifthAddToCartButton = new LabTestPage(this.page);
    await clickfifthAddToCartButton.clickFifthAddToCartButton();
  },
);
