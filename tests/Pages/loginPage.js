// // const fs = require("fs");
// // const path = require("path");
// // const { expect } = require("playwright/test");

// // function screenshotPath(fileName) {
// //   const directory = path.resolve(__dirname, "../../screenshots");
// //   fs.mkdirSync(directory, { recursive: true });
// //   return path.join(directory, fileName);
// // }

// // class LoginPage {
// //   constructor(page) {
// //     this.page = page;

// //     this.mobileNumberInput = page.getByPlaceholder("Mobile Number / Email ID");
// //     this.passwordInput = page.locator("input#password");
// //     this.rememberMe = page.locator('//label[text()="Remember me for 30 days"]');
// //     this.loginButton = page.getByRole("button", { name: "Login" });
// //   }

// //   async navigateTo() {
// //     await this.page.goto("https://www.practo.com/", {
// //       waitUntil: "domcontentloaded",
// //     });
// //     await this.page.locator('//a[text()="Login / Signup"]').click();
// //   }
// //   async fillMobileNummber(mobileNumber) {
// //     await this.mobileNumberInput.fill(mobileNumber);
// //   }
// //   async fillPassword(password) {
// //     await this.passwordInput.fill(password);
// //   }
// //   async RememberMeBtn() {
// //     await this.rememberMe.click();
// //   }
// //   async LoginBtnClick() {
// //     await this.loginButton.click();
// //   }
// //   async getLoginResult() {
// //     await this.page.waitForTimeout(5000);

// //     const currentUrl = this.page.url();

// //     console.log("Current URL:", currentUrl);

// //     // Success check
// //     if (!currentUrl.includes("login")) {
// //       await this.page.screenshot({
// //         path: screenshotPath("login-success.png"),
// //         fullPage: true,
// //       });

// //       return "Success";
// //     }

// //     // Failure screenshot
// //     await this.page.screenshot({
// //       path: screenshotPath("login-failure.png"),
// //       fullPage: true,
// //     });

// //     return "Failure";
// //   }
// // }

// // module.exports = LoginPage;

// const fs = require("fs");
// const path = require("path");

// function screenshotPath(fileName) {
//   const directory = path.resolve(__dirname, "../../screenshots");
//   fs.mkdirSync(directory, { recursive: true });
//   return path.join(directory, fileName);
// }

// class LoginPage {
//   constructor(page) {
//     this.page = page;

//     this.loginSignupLink = page.getByRole("link", {
//       name: /Login \/ Signup/i,
//     });

//     this.mobileNumberInput = page
//       .getByPlaceholder("Mobile Number / Email ID")
//       .or(page.getByPlaceholder(/Mobile Number|Email/i))
//       .first();

//     this.passwordInput = page
//       .locator("input#password, input[type='password']")
//       .first();

//     this.rememberMe = page
//       .locator('label:has-text("Remember me for 30 days")')
//       .or(page.getByText(/Remember me for 30 days/i))
//       .first();

//     this.loginButton = page.getByRole("button", { name: /^Login$/i });

//     this.errorMessage = page
//       .locator(
//         ".error, .u-error, [class*='error'], [class*='Error'], [role='alert']",
//       )
//       .filter({ hasText: /\S/ })
//       .first();
//   }

//   async navigateTo() {
//     await this.page.goto("https://www.practo.com/", {
//       waitUntil: "domcontentloaded",
//     });

//     await this.loginSignupLink.click();
//     await this.mobileNumberInput.waitFor({ state: "visible", timeout: 15000 });
//   }

//   async fillMobileNumber(mobileNumber) {
//     await this.mobileNumberInput.fill(mobileNumber || "");
//   }

//   async fillMobileNummber(mobileNumber) {
//     await this.fillMobileNumber(mobileNumber);
//   }

//   async fillPassword(password) {
//     await this.passwordInput.fill(password || "");
//   }

//   async RememberMeBtn() {
//     const visible = await this.rememberMe.isVisible().catch(() => false);

//     if (visible) {
//       await this.rememberMe.click();
//     }
//   }

//   async LoginBtnClick() {
//     await this.loginButton.click();
//   }

//   async getLoginResult() {
//     await this.page.waitForTimeout(3000);

//     const currentUrl = this.page.url();

//     const errorVisible = await this.errorMessage
//       .isVisible()
//       .catch(() => false);

//     const loginFormVisible = await this.loginButton
//       .isVisible()
//       .catch(() => false);

//     const loginSignupVisible = await this.loginSignupLink
//       .isVisible()
//       .catch(() => false);

//     const loggedInIndicatorVisible = await this.page
//       .locator("text=/My Appointments|My Profile|Logout|Sign out/i")
//       .first()
//       .isVisible()
//       .catch(() => false);

//     if (loggedInIndicatorVisible || (!loginFormVisible && !loginSignupVisible)) {
//       await this.page.screenshot({
//         path: screenshotPath("login-success.png"),
//         fullPage: true,
//       });

//       return "Success";
//     }

//     if (errorVisible || loginFormVisible || currentUrl.includes("login")) {
//       await this.page.screenshot({
//         path: screenshotPath("login-failure.png"),
//         fullPage: true,
//       });

//       return "Failure";
//     }

//     await this.page.screenshot({
//       path: screenshotPath("login-unexpected-result.png"),
//       fullPage: true,
//     });

//     return "Failure";
//   }
// }

// module.exports = LoginPage;

const fs = require("fs");
const path = require("path");

function screenshotPath(fileName) {
  const directory = path.resolve(__dirname, "../../screenshots");
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, fileName);
}

class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginSignupLink = page.getByRole("link", {
      name: /Login \/ Signup/i,
    });

    this.mobileNumberInput = page
      .getByPlaceholder("Mobile Number / Email ID")
      .or(page.getByPlaceholder(/Mobile Number|Email/i))
      .first();

    this.passwordInput = page
      .locator("input#password, input[type='password']")
      .first();

    this.rememberMe = page
      .locator('label:has-text("Remember me for 30 days")')
      .or(page.getByText(/Remember me for 30 days/i))
      .first();

    this.loginButton = page.getByRole("button", { name: /^Login$/i });

    this.errorMessage = page
      .locator(
        ".error, .u-error, [class*='error'], [class*='Error'], [role='alert']",
      )
      .filter({ hasText: /\S/ })
      .first();
  }

  async navigateTo() {
    await this.page.context().clearCookies().catch(() => {});

    await this.page.goto("https://www.practo.com/", {
      waitUntil: "domcontentloaded",
    });

    await this.page
      .evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      })
      .catch(() => {});

    await this.page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});

    await this.loginSignupLink.waitFor({ state: "visible", timeout: 15000 });
    await this.loginSignupLink.click();

    await this.mobileNumberInput.waitFor({ state: "visible", timeout: 15000 });
  }

  async fillMobileNumber(mobileNumber) {
    await this.mobileNumberInput.fill(mobileNumber || "");
  }

  async fillMobileNummber(mobileNumber) {
    await this.fillMobileNumber(mobileNumber);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password || "");
  }

  async RememberMeBtn() {
    const visible = await this.rememberMe.isVisible().catch(() => false);

    if (visible) {
      await this.rememberMe.click();
    }
  }

  async setRememberMe(rememberMe) {
    if (rememberMe) {
      const visible = await this.rememberMe.isVisible().catch(() => false);

      if (visible) {
        await this.rememberMe.click();
      }
    }
  }

  async LoginBtnClick() {
    await this.loginButton.click();
  }

  async loginWithCredentials(mobileNumber, password, rememberMe) {
    await this.fillMobileNumber(mobileNumber);
    await this.fillPassword(password);

    if (rememberMe) {
      await this.setRememberMe(rememberMe);
    }

    await this.LoginBtnClick();
  }

  async getLoginResult(testCaseId = "login") {
    await this.page.waitForTimeout(3000);

    const currentUrl = this.page.url();

    const loginFormVisible = await this.loginButton
      .isVisible()
      .catch(() => false);

    const errorVisible = await this.errorMessage
      .isVisible()
      .catch(() => false);

    const bodyText = await this.page
      .locator("body")
      .innerText()
      .catch(() => "");

    const hasFailureText =
      /invalid|incorrect|wrong|please enter|required|valid email|valid mobile|no account|password/i.test(
        bodyText,
      );

    const loggedInIndicatorVisible = await this.page
      .locator("text=/My Appointments|My Profile|Logout|Sign out/i")
      .first()
      .isVisible()
      .catch(() => false);

    if (loggedInIndicatorVisible || (!loginFormVisible && !currentUrl.includes("login"))) {
      await this.page.screenshot({
        path: screenshotPath(`${testCaseId}-success.png`),
        fullPage: true,
      });

      return "Success";
    }

    if (errorVisible || hasFailureText || loginFormVisible || currentUrl.includes("login")) {
      await this.page.screenshot({
        path: screenshotPath(`${testCaseId}-failure.png`),
        fullPage: true,
      });

      return "Failure";
    }

    await this.page.screenshot({
      path: screenshotPath(`${testCaseId}-unexpected-result.png`),
      fullPage: true,
    });

    return "Failure";
  }
}

module.exports = LoginPage;
