const data = require("../test-data/data.json");

class searchHelpPage {
    constructor(page) {
        this.help = page.locator('(//a[@href="https://help.practo.com"])[3]');
        this.input = page.locator("#s").first();
        this.submitBtn = page.locator("#searchsubmit").first();
        this.questionLink = page.locator(
            '(//a[@href="https://help.practo.com/practo-ray/getting-started/steps-to-get-listed-on-practo/"])[1]',
        );
    }

    async clickHelp() {
        await this.help.waitFor({ state: "visible", timeout: data.DEFAULT_TIMEOUT });
        await this.help.click();
    }

    async clickHelpAndSwitchToNewTab(context) {
        const previousPage = this.help.page();
        const newPagePromise = context.waitForEvent("page", {
            timeout: data.DEFAULT_TIMEOUT,
        });

        await this.clickHelp();

        const newPage = await newPagePromise;
        await newPage.waitForLoadState("domcontentloaded");

        return { previousPage, newPage };
    }

    async enterQuery(query) {
        await this.input.waitFor({ state: "visible", timeout: data.DEFAULT_TIMEOUT });
        await this.input.fill(query);
    }

    async clickSearchField() {
        await this.input.waitFor({ state: "visible", timeout: data.DEFAULT_TIMEOUT });
        await this.input.click();
    }

    async clickSubmit() {
        await this.submitBtn.waitFor({ state: "visible", timeout: data.DEFAULT_TIMEOUT });
        await this.submitBtn.click();
    }

    async clickOnQuestionLink() {
        await this.questionLink.waitFor({ state: "visible", timeout: data.DEFAULT_TIMEOUT });
        await this.questionLink.click();
    }
}

module.exports = searchHelpPage;