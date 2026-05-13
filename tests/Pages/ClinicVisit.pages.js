class BookClinicVisit {
  constructor(page) {
    this.page = page;

    // Footer / Navigation
    this.footerLink = `//span[.="Search for hospitals"]`;

    // Location
    this.locationSelector = `input[placeholder="Search location"]`;
    this.locationInput = `input[placeholder="Search location"]`;
    this.locationSuggestion = ``;

    // Hospital Search
    this.searchBar = `input[placeholder="Search doctors, clinics, hospitals, etc."]`;
    this.hospitalSuggestion = ``;

    // Doctors & Speciality
    this.doctorButton = `//button[@class="c-btn--unstyled"]/descendant::span[.="Doctors"]`;
    this.specialityDropdown = `//div[@class="css-1492t68"]`;
    this.specialityOption = ``;

    // Booking
    this.BookClinicVisitButton = `//div[.="No Booking Fee"]`;
    this.tomorrow = `//div[.="tomorrow"]`;
    this.timeslot = `//div[@class="c-day-session__body pure-g"]/descendant::span[.="03:00 PM"]`;

    // Validation & Screenshot
    this.confirmClinicVisitButton = `button:has-text("Confirm Clinic Visit")`;
    this.ScreenshotLocator = `(//div[@class="pure-u-1-2"])[1]`;
  }

  async navigateToApplication(url) {
    await this.page.goto(url);
  }

  async clickFooterLink() {
    await this.page.click(this.footerLink);
  }

  async clickLocationSelector() {
    await this.page.click(this.locationSelector);
  }

  async enterLocation(locationName) {
    await this.page.fill(this.locationInput, locationName);
  }

  async selectLocation(locationName) {
    await this.page.click(`text=${locationName}`);
  }

  async clickHospitalSearchBar() {
    await this.page.click(this.searchBar);
  }

  async clearHospitalSearchBar() {
    await this.page.fill(this.searchBar, "");
  }

  async enterHospitalName(hospitalName) {
    await this.page.fill(this.searchBar, hospitalName);

    await this.page.keyboard.press("Enter");
  }

  async selectHospital(hospitalName) {
    await this.page.click(`text=${hospitalName}`);
  }

  async clickDoctorsTab() {
    await this.page.click(this.doctorButton);
  }

  async selectSpeciality(specialityName) {
    await this.page.click(this.specialityDropdown);

    await this.page.click(`text=${specialityName}`);
  }

  async clickBookClinicVisitButton() {
    await this.page.click(this.BookClinicVisitButton);
  }

  async clickTomorrowTab() {
    await this.page.click(this.tomorrow);
  }

  async selectFirstTimeSlot() {
    await this.page.click(this.timeslot);
  }

  async takeDoctorDetailsScreenshot(screenshotName) {
    await this.page.locator(this.ScreenshotLocator).screenshot({
      path: `screenshots/${screenshotName}`,
    });
  }

  async verifyConfirmClinicVisitButtonEnabled() {
    await this.page.locator(this.confirmClinicVisitButton).isEnabled();
  }
}

module.exports = { BookClinicVisit };
