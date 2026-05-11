const fs = require("fs");
const path = require("path");
const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

setDefaultTimeout(30 * 1000);

const AUTH_FILE = path.resolve(
  __dirname,
  "../../playwright/.auth/practo.cookies.json",
);

function readCookies() {
  if (!fs.existsSync(AUTH_FILE)) {
    return [];
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(AUTH_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : parsed.cookies || [];
  } catch (error) {
    return [];
  }
}

async function injectCookies(context) {
  const cookies = readCookies();
  if (!cookies.length) {
    return;
  }

  await context.addCookies(cookies);
}

Before(async function () {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  this.browser = browser;
  this.context = context;
  this.page = page;

  await injectCookies(context);
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
