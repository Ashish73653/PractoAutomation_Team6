// const {Given,When,Then} = require('@cucumber/cucumber')
// const {expect} = require('@playwright/test')
// const {LoginPage} = require('../Pages/loginPage')

// let loginPage

// Given('I am on the Practo Login Page', async function(){
//     loginPage = new LoginPage(this.page)
//     await loginPage.navigateTo()
// })

// When('I enter {string} and {string}', async function(mobileNumber, password){
//     await loginPage.fillMobileNumber(mobileNumber)
//     await loginPage.fillPassword(password)
// })
// When('And I click the Remember me for 30 days checkbox', async function(){
//     await loginPage.RememberMeBtn()
// })
// When('I click the login button', async function(){
//     await loginPage.LoginBtnClick()
// })
// Then('I should see {string} for login', async function(expectedResult){
//     const actualResult = await loginPage.getLoginResult();
//     console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
//     expect(actualResult).toBe(expectedResult);
// })

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../Pages/loginPage');

let loginPage;

Given('I am on the Practo Login page', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigateTo();
});

// Given('I am on the Practo Login page', async function () {
//     loginPage1 = new loginPage(this.page);
//     await loginPage.navigateTo();
// });

When('I enter {string} and {string}', async function (mobileNumber, password) {
    await loginPage.fillMobileNummber(mobileNumber);
    await loginPage.fillPassword(password);
});

When('I click the Remember me for 30 days checkbox', async function () {
    await loginPage.RememberMeBtn();
});

When('I click the login button', async function () {
    await loginPage.LoginBtnClick();
});

Then('I should see {string} for login', async function (expectedResult) {
    const actualResult = await loginPage.getLoginResult();
    console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
    expect(actualResult).toBe(expectedResult);
});