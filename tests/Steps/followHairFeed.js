const { When, Then, Before } = require("@cucumber/cucumber");
const FollowHairFeedPage = require("../Pages/followHairFeed.page.js");
const { takePageScreenshot } = require("../util/takeScreenshots.js");

Before(function () {
  this.followHairPage = new FollowHairFeedPage(this.page);
});

When('click on {string}', async function (target) {
  if (target.toLowerCase() === 'see all articles') {
    await this.followHairPage.clickFollowHairFeed();
    return;
  }

  if (target.toLowerCase() === 'hair care') {
    await this.followHairPage.clickOnHairCare();
    return;
  }

  throw new Error(`Unsupported click target: ${target}`);
});

When('click on search for any heath topic', async function () {
  await this.followHairPage.searchForTopic();
});

When('fill search field with {string}', async function (topic) {
  await this.followHairPage.fillTopic(topic);
});

When('select the first feed from the search results', async function () {
  await this.followHairPage.clickOnPost();
});

When('click on like button of the field', async function () {
  await this.followHairPage.likeThePost();
});

When('click on follow button of the {string} feed', async function (feedCategory) {
  await this.followHairPage.followHairCare();
});

Then('Verify that the feed is followed by checking for updates in the feed', async function () {
  await this.page.waitForTimeout(1000);
  await takePageScreenshot("follow_hair_feed.png", this.page);
});