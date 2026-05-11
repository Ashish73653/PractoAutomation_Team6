class OrderMedicinePage {
  constructor(page) {
    this.page = page;
    this.surgeriesSection = page.locator(
      '//a[@href="/care" and @aria-label="Surgeries"]',
    );
    this.medicineSection = page.locator('//div[text()="Medicines"]');
    this.searchTextField = page.getByPlaceholder("Search for medicines, health products and more");
    this.firstSuggestion = page.locator('(//div[@class="u-columns u-seven u-m-t--10"])[1]');
    this.addtoCartButton = page.locator('//span[text() = "ADD TO CART"]');
    this.addMoreButton = page.locator('//div[text() = "+"]');
    this.viewCartButton = page.locator('//span[text() = "View Cart"]');
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.confirmOrderButton = page.getByRole("button", { name: "Confirm" });
  }

  async navigateToOrderMedicine() {
    await this.surgeriesSection.waitFor({ state: "visible", timeout: 15000 });
    await this.surgeriesSection.click();

    await this.medicineSection.click();

    await this.searchTextField.waitFor({ state: "visible", timeout: 15000 });
  }

  //   async searchMedicine(medicineName) {
  //     await this.searchTextField.fill(medicineName);
  //     await this.page.keyboard.press("Tab");
  //     await this.page.keyboard.press("Enter");
  //   }
    async searchMedicine(medicineName) {
        await this.searchTextField.waitFor({
        state: "visible",
        timeout: 15000,
        });

        await this.searchTextField.click();
        await this.searchTextField.clear();

        await this.searchTextField.pressSequentially(medicineName, {
        delay: 10,
        });
        // await this.searchTextField.fill(medicineName);

        await this.page.waitForTimeout(2000);
        await this.searchTextField.click();
        await this.firstSuggestion.click();
  }

    async addMedicineToCart(quantity) {
    await this.addtoCartButton.click();
    for (let i = 1; i < quantity; i++) {
      await this.addMoreButton.click();
      await this.page.waitForTimeout(1000);
    }
    await this.viewCartButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
    await this.confirmOrderButton.click();
  }

  async takeScreenshot() {
    await this.page.screenshot({
      path: "screenshots/order_medicine.png",
      fullPage: true,
    });
  }
}

module.exports = { OrderMedicinePage };