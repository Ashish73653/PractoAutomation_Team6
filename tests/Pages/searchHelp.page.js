const data = require("../test-data/data.json");
const { expect } = require("@playwright/test");

class searchHelpPage {
    constructor(page) {
        this.page = page;
        // Help entry point and search controls
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
   async checkForEmptySearchResult(expectedResult) {
      await this.page.waitForLoadState("domcontentloaded");
        const inputValue = await this.input.inputValue();
        const currentUrl = this.page.url();
      
        if (expectedResult === "Validation Error") {
                        // Empty search uses the default prompt text
            expect(inputValue).toMatch(/^(|Type your question and search)$/);
            expect(currentUrl).toMatch(/[?&]s=(Type\+your\+question\+and\+search)?$/);
        }   
     }
}

module.exports = searchHelpPage;