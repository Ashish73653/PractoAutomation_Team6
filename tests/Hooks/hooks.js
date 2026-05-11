const fs = require("fs");
const path = require("path");
const { Before, After, setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

setDefaultTimeout(60 * 1000);

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

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.orderMedicinePage = null;
    this.deliveryCity = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  this.context = await this.browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });
  await injectCookies(this.context);
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});

module.exports = { injectCookies };
