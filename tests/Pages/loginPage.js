const fs = require("fs");
const path = require("path");
const { expect } = require("playwright/test");

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class LoginPage {
  constructor(page) {
    this.page = page;

    this.mobileNumberInput = page.getByPlaceholder("Mobile Number / Email ID");
    this.passwordInput = page.locator("input#password");
    this.rememberMe = page.locator('//label[text()="Remember me for 30 days"]');
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async navigateTo() {
    await this.page.goto("https://www.practo.com/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.locator('//a[text()="Login / Signup"]').click();
  }
  async fillMobileNummber(mobileNumber) {
    await this.mobileNumberInput.fill(mobileNumber);
  }
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }
  async RememberMeBtn() {
    await this.rememberMe.click();
  }
  async LoginBtnClick() {
    await this.loginButton.click();
  }
  async getLoginResult() {
    await this.page.waitForTimeout(5000);

    const currentUrl = this.page.url();

    console.log("Current URL:", currentUrl);

    // Success check
    if (!currentUrl.includes("login")) {
      await this.page.screenshot({
        path: screenshotPath("login-success.png"),
        fullPage: true,
      });

      return "Success";
    }

    // Failure screenshot
    await this.page.screenshot({
      path: screenshotPath("login-failure.png"),
      fullPage: true,
    });

    return "Failure";
  }
}

module.exports = LoginPage;
