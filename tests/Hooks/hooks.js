const fs = require("fs");
const path = require("path");
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
    console.log("No auth file found for " + browserType);
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
    console.log("Injected " + cookies.length + " cookies for authentication");
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

function ensureDir(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (e) {
    // ignore
  }
}

// Setup browser and page before each scenario
Before(async function ({ pickle } = {}) {
  this.browser = await launchBrowser(browserType);

  console.log("Running tests on " + browserType);

  const screenshotsDir = path.resolve(
    process.cwd(),
    "test-results",
    "screenshots",
  );
  const videosDir = path.resolve(process.cwd(), "test-results", "videos");
  ensureDir(screenshotsDir);
  ensureDir(videosDir);

  this._scenarioStartTime = Date.now();

  this.context = await this.browser.newContext({
    recordVideo: { dir: videosDir },
  });
  this.context.setDefaultTimeout(60000);

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(60000);

  if (shouldInjectCookies(pickle)) {
    await injectCookies(this.context);
  }
});

After(async function ({ pickle } = {}) {
  const scenarioName =
    pickle && pickle.name
      ? pickle.name.replace(/[^a-z0-9-_]/gi, "_")
      : "scenario_" + Date.now();
  const screenshotsDir = path.resolve(
    process.cwd(),
    "test-results",
    "screenshots",
  );
  const videosDir = path.resolve(process.cwd(), "test-results", "videos");

  try {
    if (this.page && !this.page.isClosed()) {
      const screenshotPath = path.join(screenshotsDir, scenarioName + ".png");
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      try {
        const img = fs.readFileSync(screenshotPath);
        if (this.attach) {
          this.attach(img, {
            mediaType: "image/png",
            fileName: "Screenshot-" + scenarioName + ".png",
          });
        }
      } catch (e) {
        console.log("Failed to attach screenshot:", e.message);
      }
    } else {
      console.log("Skipping teardown screenshot: page already closed");
    }
  } catch (err) {
    console.log("Error taking screenshot:", err.message);
  }

  try {
    const projectScreenshots = path.resolve(process.cwd(), "screenshots");
    if (fs.existsSync(projectScreenshots)) {
      const files = fs
        .readdirSync(projectScreenshots)
        .map((f) => ({
          f,
          t: fs.statSync(path.join(projectScreenshots, f)).mtime.getTime(),
        }))
        .filter((x) => x.t >= this._scenarioStartTime - 2000)
        .sort((a, b) => a.t - b.t)
        .map((x) => x.f);

      for (const f of files) {
        const src = path.join(projectScreenshots, f);
        const destName = scenarioName + "_" + f;
        const dest = path.join(screenshotsDir, destName);
        try {
          fs.copyFileSync(src, dest);
        } catch (e) {
          // ignore copy errors
        }

        try {
          const img = fs.readFileSync(dest);
          if (this.attach) {
            this.attach(img, {
              mediaType: "image/png",
              fileName: "Screenshot-" + f,
            });
          }
        } catch (e) {
          console.log("Failed to attach project screenshot:", e.message);
        }
      }
    }
  } catch (e) {
    console.log("Error collecting project screenshots:", e.message);
  }

  try {
    if (this.context) {
      await this.context.close();
    }
  } catch (e) {
    // ignore
  }

  try {
    if (fs.existsSync(videosDir)) {
      const files = fs
        .readdirSync(videosDir)
        .map((f) => ({
          f,
          t: fs.statSync(path.join(videosDir, f)).mtime.getTime(),
        }))
        .sort((a, b) => b.t - a.t)
        .map((x) => x.f);

      if (files.length) {
        const newest = path.join(videosDir, files[0]);
        const dest = path.join(videosDir, scenarioName + ".webm");
        try {
          fs.copyFileSync(newest, dest);
        } catch (e) {
          // if copy fails, still try to attach original
        }

        try {
          const vid = fs.readFileSync(dest);
          if (this.attach) {
            this.attach(vid, {
              mediaType: "video/webm",
              fileName: "Video-" + scenarioName + ".webm",
            });
          }
        } catch (e) {
          console.log("Failed to attach video:", e.message);
        }
      }
    }
  } catch (e) {
    console.log("Error handling video attachment:", e.message);
  }

  try {
    if (this.browser) {
      await this.browser.close();
    }
  } catch (e) {
    // ignore
  }
});

module.exports = { injectCookies };
