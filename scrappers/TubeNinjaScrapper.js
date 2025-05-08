import puppeteer from "puppeteer";

class TubeNinjaScrapper {
  constructor(selectors) {
    this.browser = null;
    this.page = null;
    this.urls = [];
    this.verification_url = "https://www.4kdownload.com";
    this.base_url = "https://www.tubeninja.net/welcome";
    this.videoTitle = null;
    this.selectors = selectors;
  }

  async initialize() {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
  }

  async navigateTo(url) {
    console.log(`Navigating to: ${url}`);
    try {
      await this.page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 120000,
      });
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
    }
  }

  async inputLink(link) {
    try {
      await this.page.waitForSelector(this.selectors.inputField, {
        timeout: 10000,
      });
      await this.page.type(this.selectors.inputField, link);
    } catch (error) {
      console.error("Failed to input the link:", error);
    }
  }

  async submitForm(link) {
    try {
      await this.page.waitForSelector(this.selectors.submitButton, {
        timeout: 10000,
      });
      await this.page.click(this.selectors.submitButton);
      // Optional: Uncomment and use if age verification is needed
      const listOfAdultSites = [
        "https://www.pornhub.com",
        "https://www.xvideos.com",
        "https://www.twpornstars.com",
      ];

      if (listOfAdultSites.some((site) => link.startsWith(site))) {
        await this.page.waitForSelector(this.selectors.ageLimitButton, {
          timeout: 30000,
        });
        await this.page.click(this.selectors.ageLimitButton);
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
    }
  }

  async getDownloadLinks() {
    try {
      await this.page.waitForSelector(this.selectors.titleSection, {
        timeout: 10000 * 60,
      });
      this.videoTitle = await this.page.evaluate((selector) => {
        return document.querySelector(selector)?.innerText || null;
      }, this.selectors.titleSection);
      await this.page.waitForSelector(this.selectors.downloadLinksSection, {
        timeout: 10000 * 60,
      });
      const hrefs = await this.page.evaluate((selector) => {
        const links = Array.from(document.querySelectorAll(selector));
        return links
          .map((link) => link.href)
          .filter((href) => !href.startsWith("https://www"));
      }, this.selectors.downloadLinksSection);

      if (hrefs.length > 0) {
        this.urls = hrefs;
      } else {
        console.log("No valid download links found.");
      }
    } catch (error) {
      console.error("Failed to get download links:", error);
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async send() {
    return {
      urls: this.urls,
      title: this.videoTitle,
    };
  }

  async run(link) {
    try {
      await this.initialize();
      await this.navigateTo(this.base_url);
      await this.inputLink(link);
      await this.submitForm(link);
      await this.getDownloadLinks();
      return await this.send();
    } catch (error) {
      console.error("An error occurred. Please try again:", error.message);
    } finally {
      await this.close();
    }
  }
}

export default TubeNinjaScrapper;
