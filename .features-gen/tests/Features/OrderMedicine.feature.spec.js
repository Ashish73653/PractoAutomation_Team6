// Generated from: tests\Features\OrderMedicine.feature
import { test } from "playwright-bdd";

test.describe('Order medicine on Practo — end-to-end flow', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the user navigates to "https://www.practo.com"', null, { page }); 
    await And('the Practo homepage is loaded successfully', null, { page }); 
  });
  
  test('Complete end-to-end order flow for Pacimol on Practo', { tag: ['@medicine-order'] }, async ({ Given, When, Then, And, context, page }) => { 
    await Given('the user is login to Practo using "<username>" and "<password>"', null, { context, page }); 
    await When('the user navigates to the "Order Medicine" section', null, { page }); 
    await And('the user searches for "PACIMOL ACTIVE Tablet 10`S" using Tab and Enter', null, { page }); 
    await And('the user adds 5 strips of Pacimol to the cart', null, { page }); 
    await And('the user changes the delivery address to "Bangalore"', null, { page }); 
    await And('the user clicks "Place Order"', null, { page }); 
    await Then('the payment gateway page should open with a valid order summary', null, { page }); 
    await And('Pacimol with quantity 5 should appear in the order details', null, { page }); 
    await And('the delivery address should show "Bangalore"', null, { page }); 
    await And('a screenshot of the payment gateway page is captured', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\Features\\OrderMedicine.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":["@medicine-order"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user navigates to \"https://www.practo.com\"","isBg":true,"stepMatchArguments":[{"group":{"start":22,"value":"\"https://www.practo.com\"","children":[{"start":23,"value":"https://www.practo.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Practo homepage is loaded successfully","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is login to Practo using \"<username>\" and \"<password>\"","stepMatchArguments":[{"group":{"start":34,"value":"\"<username>\"","children":[{"start":35,"value":"<username>","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":51,"value":"\"<password>\"","children":[{"start":52,"value":"<password>","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the \"Order Medicine\" section","stepMatchArguments":[{"group":{"start":26,"value":"\"Order Medicine\"","children":[{"start":27,"value":"Order Medicine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user searches for \"PACIMOL ACTIVE Tablet 10`S\" using Tab and Enter","stepMatchArguments":[{"group":{"start":22,"value":"\"PACIMOL ACTIVE Tablet 10`S\"","children":[{"start":23,"value":"PACIMOL ACTIVE Tablet 10`S","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And the user adds 5 strips of Pacimol to the cart","stepMatchArguments":[{"group":{"start":14,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And the user changes the delivery address to \"Bangalore\"","stepMatchArguments":[{"group":{"start":41,"value":"\"Bangalore\"","children":[{"start":42,"value":"Bangalore","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And the user clicks \"Place Order\"","stepMatchArguments":[{"group":{"start":16,"value":"\"Place Order\"","children":[{"start":17,"value":"Place Order","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the payment gateway page should open with a valid order summary","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And Pacimol with quantity 5 should appear in the order details","stepMatchArguments":[{"group":{"start":22,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the delivery address should show \"Bangalore\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Bangalore\"","children":[{"start":34,"value":"Bangalore","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And a screenshot of the payment gateway page is captured","stepMatchArguments":[]}]},
]; // bdd-data-end