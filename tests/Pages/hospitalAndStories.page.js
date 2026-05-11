const  data = require('../test-data/data.json');

class HospitalAndStoriesPage {
    constructor(page) {
        this.page = page;
        this.findDoctor = page.locator('//a[.="Find Doctors"]');
        this.location = page.locator('(//input[@class="c-omni-searchbox c-omni-searchbox--large"])[1]');
        this.inputField = page.getByPlaceholder("Search doctors, clinics, hospitals, etc.");
        this.doctorsBtn = page.getByRole('button', { name: 'Doctors(19)' });
        this.dropdownSelect = page.locator('#c-omni-container').getByText('Apollo Clinic', { exact: true }).first();
        this.pediatricianOption = page.getByText('pediatrician (2)')
        this.drSelect = page.getByText('Dr. Sumedha Gandotra', { exact: false }).first();
        this.viewProfileBtn = page.getByRole('button', { name: "View Profile" }).first();
        this.shareLink = page.getByRole('link', { name: 'Share your story' })
        this.recommendBtn = page.locator('//label[@for="recommendDoctor"]');
        this.reasonField = page.getByText('e.g. Stomach Ache, body pain');
        this.treatmentInput = page.locator('input[type="text"]').first();

        this.waitTimeOption = page.getByText('Less than 15 min');
        this.improvementCheckbox = page.locator('div:nth-child(4) > .checkbox > label > div > .icon-ic_checkbox_system');
        this.textArea = page.getByRole('textbox', { name: 'Start typing here...' });
        this.anonymousCheckbox = page.locator('.checkbox.u-d-inlineblock > label > div > .icon-ic_checkbox_system');
        this.specialityDropdown = page.locator('.speciality-dropdown, [data-qa-id="speciality_dropdown"], button:has-text("All Specialities")').first();
        this.doctorSearchInput = page.locator('input[placeholder*="Search"], input[placeholder*="doctor"]').first();
    }

    async clickOnFindDoctor() {
        await this.findDoctor.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.findDoctor.click();
    }

    async enterLocation(location) {
        await this.location.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.location.fill(location);
    }

    async enterHospitalName(name) {
        await this.inputField.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.inputField.fill(name);
    }

    async selectHospital() {
        await this.dropdownSelect.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.dropdownSelect.click();
    }

    async clickOnDoctors() {
        await this.page.waitForLoadState() 
        await this.doctorsBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.doctorsBtn.click();
    }
    async selectPediatrician() {
        await this.pediatricianOption.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.pediatricianOption.click();
    }

    async searchDoctorByName(doctorName) {
            await this.drSelect.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
            await this.drSelect
    }

    async clickViewProfile() {
        await this.viewProfileBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.viewProfileBtn.click();
    }

    async clickShareStory() {
       await this.shareLink.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
       await this.shareLink.click();
    }

    async clickRecommendDoctor() {
        await this.recommendBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.recommendBtn.click();
    }

    async fillTreatment(reason) {
        await this.reasonField.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.reasonField.click();
        try {
            await this.treatmentInput.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
            await this.treatmentInput.fill(reason);
        } catch {
           console.log("Treatment input field not found");
        }

        await this.page.keyboard.press('Enter');

    }

    async chooseWaitTime() {
        await this.waitTimeOption.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.waitTimeOption.click();
    }

    async chooseHappyWith() {
        await this.improvementCheckbox.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.improvementCheckbox.click();
    }

    async fillExperience(text) {
        await this.textArea.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.textArea.fill(text);
    }

    async keepAnonymous() {
        await this.anonymousCheckbox.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.anonymousCheckbox.click();
    }
}

module.exports = HospitalAndStoriesPage;