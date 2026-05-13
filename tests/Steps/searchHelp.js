const { Given, When, Then, Before } = require("@cucumber/cucumber");
const SearchHelpPage = require("../Pages/searchHelp.page.js");
const { takePageScreenshot } = require("../util/takeScreenshots.js");
const data = require("../test-data/data.json");

Before(function () {
	this.searchHelpPage = new SearchHelpPage(this.page);
});

Given("Navigate to url", async function () {
	const url = data.searchHelp.url;

	await this.page.goto(url);
	this.searchHelpPage = new SearchHelpPage(this.page);
});

When("click on Help", async function () {
	const tabState = await this.searchHelpPage.clickHelpAndSwitchToNewTab(this.context);
	this.previousPage = tabState.previousPage;
	this.page = tabState.newPage;
	this.searchHelpPage = new SearchHelpPage(this.page);
});

When("click on search field in the help section", async function () {
	await this.searchHelpPage.clickSearchField();
});

When("fill search with search query", async function () {
	await this.searchHelpPage.enterQuery(data.searchHelp.searchQuery);
});

When("fill search with empty search query", async function () {
	await this.searchHelpPage.enterQuery(data.searchHelp.emptySearchQuery);
});

When("select the second result from the search results", async function () {
	await this.searchHelpPage.clickSubmit();
});

When("submit the help search", async function () {
	await this.searchHelpPage.clickSubmit();
});

When("click on the selected result", async function () {
	await this.searchHelpPage.clickOnQuestionLink();
});

Then(
	"Verify that the selected result is relevant to the search query by taking a screenshot of the result page",
	async function () {
		await this.page.waitForLoadState("domcontentloaded");
		await takePageScreenshot("search_help_result.png", this.page);
	},
);

Then("I should see expected result for help search", async function () {
	await this.searchHelpPage.checkForEmptySearchResult(data.searchHelp.expectedEmptyResult);
});
