import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDataDir = path.join(__dirname, "user_data");

class PuppeteerWrapper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1300, height: 820 },
      userDataDir: userDataDir,
      // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();
  }

  async navigateTo(url) {
    if (this.page) {
      await this.page.goto(url);
    } else {
      throw new Error("Page not initialized. Call launchBrowser() first.");
    }
  }

  async clickElementByXPath(xpath) {
    if (this.page) {
      try {
        const button = await this.page.waitForSelector("xpath=" + xpath);
        if (button) {
          await button.click();
          console.log("Button clicked successfully");
        } else {
          console.log("Button not found");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      throw new Error("Page not initialized. Call launchBrowser() first.");
    }
  }
  async fillInputFieldByXPath(xpath, value) {
    if (this.page) {
      try {
        const inputField = await this.page.waitForSelector("xpath=" + xpath);
        if (inputField) {
          await inputField.type(value);
          console.log("Input field filled successfully");
        } else {
          console.log("Input field not found");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      throw new Error("Page not initialized. Call launchBrowser() first.");
    }
  }
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    } else {
      throw new Error("Browser not initialized. Call launchBrowser() first.");
    }
  }
}

// 使用示例
(async () => {
  const puppeteerWrapper = new PuppeteerWrapper();

  await puppeteerWrapper.launchBrowser();
  await puppeteerWrapper.navigateTo(
    // "https://meeting.tencent.com/login.html?redirect_link=https%3A%2F%2Fmeeting.tencent.com%2F"
    "https://meeting.tencent.com/user-center/join"
  );
  //   await puppeteerWrapper.clickElementByXPath(
  //     "//html/body/div/div/section/section/div/div[3]/div/div[2]/div[1]"
  //   );

  //   await puppeteerWrapper.clickElementByXPath(
  //     "/html/body/div/div/section/section/header/span/span"
  //   );

  //   await puppeteerWrapper.fillInputFieldByXPath(
  //     "/html/body/div/div/section/section/div/div[2]/span/input",
  //     "18751888511"
  //   );

  //   await puppeteerWrapper.fillInputFieldByXPath(
  //     "/html/body/div/div/section/section/div/div[4]/div/input",
  //     "Qq123456@"
  //   );

  //   await puppeteerWrapper.clickElementByXPath(
  //     "/html/body/div/div/section/section/div/div[5]/div/button"
  //   );

  // 如果不需要立即关闭浏览器，可以注释掉下面这行
  //   await puppeteerWrapper.closeBrowser();
})();
