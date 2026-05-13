class VideoConsultPage {
  constructor(page) {
    this.page = page;

    // this.loginButton = "text=Login";
    // this.mobileNumberInput = 'input[name="username"]';
    // this.passwordInput = 'input[name="password"]';
    // this.loginSubmitButton = 'button[type="submit"]';

    this.videoConsultButton = `//div[@class="nav-mid"]/descendant::a[@title="chat"][1]`;
    this.seeAllSpecialityButton = `//a[.="See all Specialities"]`;
    this.symptomInput = `//textarea[@name="detailedDescription"]`;
    this.continueButton = `//button[@class="btn-blue continue-btn"]`;
    this.continueToPaymentButton = `//span[.=" Continue to payment"]`;

    // Payment
    this.cardHolderNameInput = "#name-on-card";
    this.cardNumberInput = "#card-number";
    this.validUptoInput = "#valid-upto";
    this.cvvInput = "#cvv";
  }

  async navigateToApplication(url) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async enterMobileNumber(mobileNumber) {
    await this.page.fill(this.mobileNumberInput, mobileNumber);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginSubmitButton() {
    await this.page.click(this.loginSubmitButton);
  }

  async clickVideoConsult() {
    await this.page.click(this.videoConsultButton);
  }

  async clickSeeAllSpeciality() {
    await this.page.click(this.seeAllSpecialityButton);
  }

  async enterSymptom(symptom) {
    await this.page.fill(this.symptomInput, symptom);
  }

  async selectSpeciality(speciality) {
    await this.page.click(`text=${speciality}`);
  }

  async clickContinueButton() {
    await this.page.click(this.continueButton);
  }

  async clickContinueToPaymentButton() {
    await this.page.click(this.continueToPaymentButton);
  }

  async enterCardHolderName(cardHolderName) {
    await this.page.fill(this.cardHolderNameInput, cardHolderName);
  }

  async enterCardNumber(cardNumber) {
    await this.page.fill(this.cardNumberInput, cardNumber);
  }

  async enterValidUpto(validUpto) {
    await this.page.fill(this.validUptoInput, validUpto);
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

module.exports = { VideoConsultPage };
