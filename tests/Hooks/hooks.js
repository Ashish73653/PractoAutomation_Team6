const fs = require("fs");
const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(30 * 1000);
const {
  getAuthFile,
  getBrowserType,
  launchBrowser,
  loadEnvFile,
} = require("../util/browserConfig");

setDefaultTimeout(60000);

loadEnvFile();

const browserType = getBrowserType();
const AUTH_FILE = getAuthFile(browserType);

function readCookies() {
  if (!fs.existsSync(AUTH_FILE)) {
    console.log(`No auth file found for ${browserType}`);
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

function shouldInjectCookies(pickle) {
  const tags = (pickle?.tags || []).map((tag) => tag.name.toLowerCase());
  return (
    !tags.includes("@registration") &&
    !tags.includes("@login") &&
    !tags.includes("@forgotpassword")
  );
}

// Setup browser and page before each scenario
Before(async function ({ pickle } = {}) {
  // Launch browser
  this.browser = await launchBrowser(browserType);

  console.log(`Running tests on ${browserType}`);

  // Create context
  this.context = await this.browser.newContext();
  this.context.setDefaultTimeout(60000);

  // Create page
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(60000);

  // Inject cookies only for scenarios that require an authenticated session
  if (shouldInjectCookies(pickle)) {
    await injectCookies(this.context);
  }
});

// Close browser after each scenario
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

After(async function () {
  if (this.context) {
    await this.context.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});

module.exports = { injectCookies };
