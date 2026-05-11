const  data = require('../test-data/data.json');
const { expect } = require('@playwright/test');
class followHairFeedPage {
      
    constructor(page) {
        this.page = page;
        this.followHairFeedBtn = page.getByRole('button', { name: 'See all articles' }).first();
        this.searchTopic = page.locator('#searchBar');
        this.textArea = page.getByRole('textbox', { name: 'Search for any health topic' })
        this.Post =  page.locator('.horizontal-post-card').first() 
        this.likeBtn =  page.locator('.fit-feed-icon.icon-ic_heart_filled_system').first()
        this.HairCare =  page.getByRole('link', { name: 'Hair care' }).first()
        this.followBtn =  page.locator('.follow-tag-button')
    }
    
    async clickFollowHairFeed() {
        await this.followHairFeedBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.followHairFeedBtn.click();
    }
    async searchForTopic(topic) {
        await expect(this.searchTopic).toBeVisible();
        await this.searchTopic.click();
    }
    async fillTopic(topic){
        await this.textArea.fill(topic);
        await this.page.keyboard.press('Enter');
    }
    async clickOnPost() {
        await this.Post.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.Post.click();
    }
    async likeThePost() {
        await this.likeBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.likeBtn.scrollIntoViewIfNeeded();
        await this.likeBtn.click();
    }
    async clickOnHairCare() {
        await this.HairCare.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.HairCare.click();
    }
    async followHairCare() {
        await this.followBtn.waitFor({ state: 'visible', timeout: data.DEFAULT_TIMEOUT });
        await this.followBtn.click();
    }

}

module.exports = followHairFeedPage;