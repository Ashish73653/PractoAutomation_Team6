const fs = require("fs");
const readline = require("readline");
const path = require("path");
const { chromium } = require("@playwright/test");

const AUTH_FILE = path.resolve(
  __dirname,
  "playwright/.auth/practo.cookies.json",
);
const PRACTO_URL = "https://www.practo.com/";

function waitForEnter(message) {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    interface.question(`${message}\n`, () => {
      interface.close();
      resolve();
    });
  });
}

async function saveAuth() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(PRACTO_URL, { waitUntil: "domcontentloaded" });

    console.log(
      "Log in to Practo in the opened browser, then press Enter here to save cookies.",
    );
    await waitForEnter("Press Enter after you finish logging in:");

    const cookies = await context.cookies();
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
    fs.writeFileSync(AUTH_FILE, JSON.stringify(cookies, null, 2));
    console.log(`Saved ${cookies.length} cookies to ${AUTH_FILE}`);
  } finally {
    await context.close();
    await browser.close();
  }
}

if (require.main === module) {
  saveAuth().catch((error) => {
    console.error("Failed to save Practo cookies:", error);
    process.exitCode = 1;
  });
}

module.exports = { saveAuth, AUTH_FILE };
