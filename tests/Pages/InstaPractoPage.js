class InstaPractoPage {
    constructor(page) {
        this.setPage(page);
    }

    setPage(page) {
        this.page = page;

        this.instaPractolink = page.locator('//span[text()="Insta by Practo"]');

        this.instaPlans = page.locator('//a[@data-event="Plans"]');

        this.nameInputTextField = page.getByPlaceholder(" Enter your name ");

        this.emailInputTextField = page.locator('//input[@name="email"]');

        this.mobileInputTextField = page.locator('.require.phone');

        this.cityInputTextField = page.getByPlaceholder(" Enter your city ");

        this.getDemoButton = page.locator('//input[@type="submit"]');

        this.successMessage = page.locator('text=Thank');
    }

    async openPractoWebsite(url) {
        await this.page.goto(url);
    }

    async verifyHomepageLoaded() {
        await this.page.waitForLoadState("networkidle");
    }

    async openInstaPractoPage() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.instaPractolink.click()
        ]);

        await newPage.waitForLoadState("domcontentloaded");

        this.setPage(newPage);
    }

    async clickSelectPlans() {
        await this.instaPlans.click();
    }

    async enterName(name) {
        await this.nameInputTextField.fill(name);
    }

    async enterEmail(email) {
        await this.emailInputTextField.fill(email);
    }

    async enterMobileNumber(number) {
        await this.mobileInputTextField.fill(number);
    }

    async enterCity(city) {
        await this.cityInputTextField.fill(city);
    }

    async clickGetDemoButton() {
        await this.getDemoButton.click();
    }

    async verifySuccessMessageDisplayed() {
        await this.successMessage.waitFor({
            state: "visible",
            timeout: 15000
        });
    }

    async captureScreenshot() {
        await this.page.screenshot({
            path: "screenshots/insta-demo-request.png",
            fullPage: true
        });
    }
}

module.exports = InstaPractoPage;