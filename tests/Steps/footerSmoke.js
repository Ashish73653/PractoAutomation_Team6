const { Given, When, Then } = require("@cucumber/cucumber");
const FooterSmokePage = require("../Pages/footerSmokePage");

let footerSmokePage;

Given("I am on the Practo home page for footer smoke testing", async function () {
  footerSmokePage = new FooterSmokePage(this.page);
  await footerSmokePage.navigateTo();
});

When("I scroll to the Practo footer", async function () {
  await footerSmokePage.scrollToFooter();
});

Then("I should see all major footer sections", async function () {
  await footerSmokePage.verifyFooterSections();
});

Then("I should see important footer links", async function () {
  await footerSmokePage.verifyImportantFooterLinks();
  await footerSmokePage.verifyFooterHasWorkingLinks();
});

Then("the Contact Us footer link should open the contact page", async function () {
  await footerSmokePage.openContactUsFromFooter();
});
