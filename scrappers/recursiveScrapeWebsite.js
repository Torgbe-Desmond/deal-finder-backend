import * as selectors from "../utils/recursiveSelectors.js";
import launchBrowser from "../utils/puppeteerConfig.js";

async function recursiveScrapeWebsite(domain, link) {
  console.log("domain:", domain);
  console.log("link:", link);

  const selectedDomain = selectors[domain];

  if (!selectedDomain) {
    console.error(`No selectors found for domain: ${domain}`);
    return [];
  }

  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    // ✅ Move setUserAgent after page definition
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(link, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    const products = await page.evaluate((selectors) => {
      let results = [];
      let more_info_product_image = [];
      let details_info = [];

      let description =
        document
          .querySelector(selectors?.description)
          ?.innerText?.trim() || "";
      let location =
        document.querySelector(selectors?.location)?.innerText?.trim() || "";

      document.querySelectorAll(selectors?.container).forEach((image) => {
        let imageElement = image.querySelector(selectors?.image);
        let src = imageElement?.getAttribute("src") || "";
        let srcset = imageElement?.getAttribute("srcset") || "";

        let imageLink = src.split(",")[0]?.split(" ")[0] || 
                        srcset.split(",")[0]?.split(" ")[0] || "#";

        more_info_product_image.push(imageLink);
      });

      document.querySelectorAll(selectors?.details).forEach((details) => {
        details_info.push({
          detail_title:
            details
              .querySelector(selectors?.description_title)
              ?.textContent?.trim() || "",
          details_value:
            details
              .querySelector(selectors?.details__value)
              ?.textContent?.trim() || "",
        });
      });

      return {
        more_info_product_image,
        details_info,
        description,
        location,
      };
    }, selectedDomain); // ✅ Pass selectedDomain correctly

    return products;
  } catch (error) {
    console.error(`Error scraping ${domain}:`, error);
    return [];
  } finally {
    await browser.close(); // ✅ Always close the browser
  }
}

export default recursiveScrapeWebsite;
