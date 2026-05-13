const fs = require("fs");
const path = require("path");
const { chromium, firefox, webkit } = require("@playwright/test");

const ENV_FILE = path.resolve(__dirname, "..", "..", ".env");
const VALID_BROWSER_TYPES = new Set(["chromium", "firefox", "webkit"]);

let envLoaded = false;

function loadEnvFile() {
  if (envLoaded) {
    return;
  }

  envLoaded = true;

  if (!fs.existsSync(ENV_FILE)) {
    return;
  }

  const lines = fs.readFileSync(ENV_FILE, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function getBrowserType() {
  loadEnvFile();

  const browserType = (
    process.env.BROWSER_TYPE ||
    process.env.BROWSERTYPE ||
    process.env.browserType ||
    "chromium"
  )
    .trim()
    .toLowerCase();

  return VALID_BROWSER_TYPES.has(browserType) ? browserType : "chromium";
}

function getBrowserLauncher(browserType) {
  switch (browserType) {
    case "firefox":
      return firefox;
    case "webkit":
      return webkit;
    case "chromium":
    default:
      return chromium;
  }
}

async function launchBrowser(browserType, launchOptions = {}) {
  const launcher = getBrowserLauncher(browserType);

  switch (browserType) {
    case "firefox":
      return launcher.launch({
        headless: false,
        ...launchOptions,
      });

    case "webkit":
      return launcher.launch({
        headless: false,
        ...launchOptions,
      });

    case "chromium":
    default:
      return launcher.launch({
        headless: false,
        ...launchOptions,
      });
  }
}

function getAuthFile(browserType = getBrowserType()) {
  return path.resolve(
    __dirname,
    "..",
    "..",
    "playwright",
    ".auth",
    `practo.cookies.${browserType}.json`,
  );
}

module.exports = {
  getAuthFile,
  getBrowserLauncher,
  getBrowserType,
  launchBrowser,
  loadEnvFile,
};
