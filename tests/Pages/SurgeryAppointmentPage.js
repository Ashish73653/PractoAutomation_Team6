// class SurgeryAppointmentPage {
//     constructor(page)  {
//         this.page = page;
//         this.surgeriesSection = page.locator('//a[@href="/care" and @aria-label="Surgeries"]');
//         this.selectCityDropdown = page.locator('//span[@class="generalLeadForm-module_icon__jt4Z-"]').first();
//         this.selectCity = page.locator('//div[@data-qa-id="city-name-container"]').first();
//         this.selectAilmentDropdown = page.locator('(//span[@class="generalLeadForm-module_icon__jt4Z-"])[2]');
//         this.selectAilment = page.locator(
//           '//div[@class="list-module_itemContent__QEeb7 w-5/6 text-gray-2 text-12px font-normal cursor-pointer"]',
//         ).first();
//         this.nameTextField = page.getByPlaceholder("Name*");
//         this.mobileTextField = page.locator("#Phone-Gen-Lead-Form");
//         this.bookAppointmentButton = page.getByRole("button", { name: "Book Appointment" });
//     }

//     async navigateToSurgeryAppointment() {
//         await this.surgeriesSection.waitFor({ state: "visible", timeout: 15000 });
//         await this.surgeriesSection.click();
//     }

//     async selectCityFromDropdown(cityName) {
//         await this.selectCity.click();
//         const cityOption = this.page.locator(`//li[text()="${cityName}"]`);
//         await cityOption.waitFor({ state: "visible", timeout: 15000 });
//         await cityOption.click();
//     }
// }


// pages/SurgeryAppointmentPage.js

class SurgeryAppointmentPage {
  constructor(page) {
    this.page = page;

    this.surgeriesSection = page.locator(
      '//a[@href="/care" and @aria-label="Surgeries"]',
    );

    this.cityDropdown = page.locator(
      '(//span[contains(@class,"generalLeadForm-module_icon__jt4Z-")])[1]',
    );
    this.selectCity = page
      .locator('//div[@data-qa-id="city-name-container"]')
      .first();
    this.ailmentDropdown = page.locator(
      '(//span[contains(@class,"generalLeadForm-module_icon__jt4Z-")])[2]',
    );
    this.selectAilment = page
      .locator(
        '//div[@class="list-module_itemContent__QEeb7 w-5/6 text-gray-2 text-12px font-normal cursor-pointer"]',
      )
      .first();

    this.nameTextField = page.getByPlaceholder("Name*");
    this.mobileTextField = page.locator("#Phone-Gen-Lead-Form");

    this.bookAppointmentButton = page.getByRole("button", {
      name: "Book Appointment",
    });

    this.congratulationsPopup = page.locator("text=Congratulations");
  }

  async openPractoWebsite(url) {
    await this.page.goto(url);
  }

  async verifyHomepageLoaded() {
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToSurgeryAppointment() {
    await this.surgeriesSection.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await this.surgeriesSection.click();
  }

  async selectCityFromDropdown(cityName) {
    await this.cityDropdown.click();
    await this.selectCity.click();
  }

  async selectAilmentFromDropdown(ailmentName) {
    await this.ailmentDropdown.click();
    await this.selectAilment.click();
  }

  async enterPatientName(name) {
    await this.nameTextField.fill(name);
  }

  async enterMobileNumber(number) {
    await this.mobileTextField.fill(number);
  }

  async clickBookAppointmentButton() {
    await this.bookAppointmentButton.click();
  }

  async verifyCongratulationsPopup() {
    await this.congratulationsPopup.waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  async captureScreenshot() {
    await this.page.screenshot({
      path: "screenshots/surgery-booking-confirmation.png",
      fullPage: true,
    });
  }
}

module.exports = SurgeryAppointmentPage;