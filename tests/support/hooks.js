const fs = require("fs");
const path = require("path");
const { Before } = require("@cucumber/cucumber");

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
  const context =
    this.context || (this.page && this.page.context && this.page.context());

  if (!context) {
    return;
  }

  await injectCookies(context);
});

module.exports = { injectCookies };
