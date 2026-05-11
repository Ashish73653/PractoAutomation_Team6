const fs = require("fs");
const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const { AUTH_FILE } = require("../util/saveAuth");

setDefaultTimeout(60000);

function readCookies() {
  if (!fs.existsSync(AUTH_FILE)) {
    console.log("No auth file found");
    return [];
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(AUTH_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : parsed.cookies || [];
  } catch (error) {
    console.log("Error reading cookies:", error.message);
    return [];
  }
}

async function injectCookies(context) {
  const cookies = readCookies();
  if (!cookies.length) {
    console.log("No cookies to inject");
    return;
  }

  try {
    await context.addCookies(cookies);
    console.log(`Injected ${cookies.length} cookies for authentication`);
  } catch (error) {
    console.log("Error injecting cookies:", error.message);
  }
}

// Setup browser and page before each scenario
Before(async function () {
  // Launch browser
  this.browser = await chromium.launch({ headless: false });

  // Create context
  this.context = await this.browser.newContext();
  this.context.setDefaultTimeout(60000);

  // Create page
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(60000);

  // Inject cookies for authentication
  await injectCookies(this.context);
});

// Close browser after each scenario
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

module.exports = { injectCookies };
