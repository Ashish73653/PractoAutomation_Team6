const fs = require("fs");
const path = require("path");

const takePageScreenshot = async (filename, pageOrObject) => {
  // accept either a Playwright `page` or a page-wrapper object that exposes `.page`
  const page =
    pageOrObject && pageOrObject.page ? pageOrObject.page : pageOrObject;

  if (!page) {
    throw new Error("No Playwright page provided to takePageScreenshot");
  }

  const dir = path.resolve(process.cwd(), "test-results", "screenshots");
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    // ignore
  }

  const filePath = path.join(dir, filename);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
};

module.exports = { takePageScreenshot };
