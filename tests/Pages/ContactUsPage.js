
class ContactUsPage {
    constructor(page) {
        this.setPage(page);
    }

    setPage(page) {
        this.page = page;

        this.contactUslink = page.locator('//span[text()="Contact Us"]');

        this.interestDropdown = page.locator('//select[@name="interested"]');

        this.nameInputTextField = page.getByPlaceholder("Enter your name");

        this.mobileInputTextField = page.locator('.require.phone');

        this.emailInputTextField = page.locator('//input[@name="email"]');

        this.countryDropdown = page.locator('//select[@name="country"]');

        this.cityInputTextField = page.locator('//input[@name="city"]');

        this.messageTextArea = page.getByPlaceholder("Message");

        this.submitButton = page.locator('//input[@type="submit"]');

        this.successMessage = page.locator('text=Thank');
    }

    async openPractoWebsite(url) {
        await this.page.goto(url);
    }

    async verifyHomepageLoaded() {
        await this.page.waitForLoadState("networkidle");
    }

    async openContactUsPageInNewTab() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.contactUslink.click()
        ]);

        await newPage.waitForLoadState("domcontentloaded");

        this.setPage(newPage);
    }

    async selectInterest(interest) {
        await this.interestDropdown.selectOption({ label: interest });
    }

    async enterName(name) {
        await this.nameInputTextField.fill(name);
    }

    async enterMobileNumber(number) {
        await this.mobileInputTextField.fill(number);
    }

    async enterEmail(email) {
        await this.emailInputTextField.fill(email);
    }

    async verifyCountry(expectedCountry) {
        const actualCountry = await this.countryDropdown.inputValue();

        if (actualCountry !== expectedCountry) {
            throw new Error(
                `Expected country ${expectedCountry} but found ${actualCountry}`
            );
        }
    }

    async enterCity(city) {
        await this.cityInputTextField.fill(city);
    }

    async enterMessage(message) {
        await this.messageTextArea.fill(message);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async verifyContactRequestSubmitted() {
        await this.successMessage.waitFor({
            state: "visible",
            timeout: 15000
        });
    }

    async captureScreenshot() {
        await this.page.screenshot({
            path: "screenshots/contact-us-form.png",
            fullPage: true
        });
    }
}

module.exports = ContactUsPage;