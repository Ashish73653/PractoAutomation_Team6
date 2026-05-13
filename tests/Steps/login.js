// // // const {Given,When,Then} = require('@cucumber/cucumber')
// // // const {expect} = require('@playwright/test')
// // // const {LoginPage} = require('../Pages/loginPage')

// // // let loginPage

// // // Given('I am on the Practo Login Page', async function(){
// // //     loginPage = new LoginPage(this.page)
// // //     await loginPage.navigateTo()
// // // })

// // // When('I enter {string} and {string}', async function(mobileNumber, password){
// // //     await loginPage.fillMobileNumber(mobileNumber)
// // //     await loginPage.fillPassword(password)
// // // })
// // // When('And I click the Remember me for 30 days checkbox', async function(){
// // //     await loginPage.RememberMeBtn()
// // // })
// // // When('I click the login button', async function(){
// // //     await loginPage.LoginBtnClick()
// // // })
// // // Then('I should see {string} for login', async function(expectedResult){
// // //     const actualResult = await loginPage.getLoginResult();
// // //     console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
// // //     expect(actualResult).toBe(expectedResult);
// // // })

// // const { Given, When, Then } = require('@cucumber/cucumber');
// // const { expect } = require('@playwright/test');
// // const LoginPage = require('../Pages/loginPage');

// // let loginPage;

// // Given('I am on the Practo Login page', async function () {
// //     loginPage = new LoginPage(this.page);
// //     await loginPage.navigateTo();
// // });

// // // Given('I am on the Practo Login page', async function () {
// // //     loginPage1 = new loginPage(this.page);
// // //     await loginPage.navigateTo();
// // // });

// // When('I enter {string} and {string}', async function (mobileNumber, password) {
// //     await loginPage.fillMobileNummber(mobileNumber);
// //     await loginPage.fillPassword(password);
// // });

// // When('I click the Remember me for 30 days checkbox', async function () {
// //     await loginPage.RememberMeBtn();
// // });

// // When('I click the login button', async function () {
// //     await loginPage.LoginBtnClick();
// // });

// // Then('I should see {string} for login', async function (expectedResult) {
// //     const actualResult = await loginPage.getLoginResult();
// //     console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
// //     expect(actualResult).toBe(expectedResult);
// // });

// const { Given, When, Then } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");
// const LoginPage = require("../Pages/loginPage");

// function getLoginPage(world) {
//   if (!world.loginPage) {
//     world.loginPage = new LoginPage(world.page);
//   }
//   return world.loginPage;
// }

// Given("I am on the Practo Login page", async function () {
//   this.loginPage = new LoginPage(this.page);
//   await this.loginPage.navigateTo();
// });

// When("I enter {string} and {string}", async function (mobileNumber, password) {
//   const loginPage = getLoginPage(this);
//   await loginPage.fillMobileNumber(mobileNumber);
//   await loginPage.fillPassword(password);
// });

// When("I click the Remember me for 30 days checkbox", async function () {
//   const loginPage = getLoginPage(this);
//   await loginPage.RememberMeBtn();
// });

// When("I click the login button", async function () {
//   const loginPage = getLoginPage(this);
//   await loginPage.LoginBtnClick();
// });

// Then("I should see {string} for login", async function (expectedResult) {
//   const loginPage = getLoginPage(this);
//   const actualResult = await loginPage.getLoginResult();

//   console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
//   expect(actualResult).toBe(expectedResult);
// });

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const LoginPage = require("../Pages/loginPage");
const loginTestData = require("../test-data/loginData.json");

function getLoginPage(world) {
  if (!world.loginPage) {
    world.loginPage = new LoginPage(world.page);
  }

  return world.loginPage;
}

Given("I have login test data for {string} cases", function (caseType) {
  const cases = loginTestData[caseType];

  if (!cases || !Array.isArray(cases) || cases.length === 0) {
    throw new Error(`No login test data found for case type: ${caseType}`);
  }

  this.loginCaseType = caseType;
  this.loginCases = cases;
  this.loginResults = [];
});

When("I execute the login test cases", async function () {
  this.loginResults = [];

  for (const testCase of this.loginCases) {
    this.loginPage = new LoginPage(this.page);

    await this.loginPage.navigateTo();
    await this.loginPage.loginWithCredentials(
      testCase.mobileNumber,
      testCase.password,
      testCase.rememberMe,
    );

    const actualResult = await this.loginPage.getLoginResult(testCase.testCaseId);

    this.loginResults.push({
      testCaseId: testCase.testCaseId,
      testCaseTitle: testCase.testCaseTitle,
      expectedResult: testCase.expectedResult,
      actualResult,
    });

    console.log(
      `${testCase.testCaseId} | ${testCase.testCaseTitle} | Expected: ${testCase.expectedResult} | Actual: ${actualResult}`,
    );
  }
});

Then("each login result should match the expected result", function () {
  const failedCases = this.loginResults.filter(
    (result) => result.actualResult !== result.expectedResult,
  );

  expect(
    failedCases,
    `Login failures:\n${JSON.stringify(failedCases, null, 2)}`,
  ).toEqual([]);
});

Given("I am on the Practo Login page", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateTo();
});

When("I enter {string} and {string}", async function (mobileNumber, password) {
  const loginPage = getLoginPage(this);
  await loginPage.fillMobileNumber(mobileNumber);
  await loginPage.fillPassword(password);
});

When("I click the Remember me for 30 days checkbox", async function () {
  const loginPage = getLoginPage(this);
  await loginPage.RememberMeBtn();
});

When("I click the login button", async function () {
  const loginPage = getLoginPage(this);
  await loginPage.LoginBtnClick();
});

Then("I should see {string} for login", async function (expectedResult) {
  const loginPage = getLoginPage(this);
  const actualResult = await loginPage.getLoginResult();

  console.log(`Expected: ${expectedResult} | Actual: ${actualResult}`);
  expect(actualResult).toBe(expectedResult);
});
