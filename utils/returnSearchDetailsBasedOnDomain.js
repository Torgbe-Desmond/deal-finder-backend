import * as selectors from "./recursiveSelectors.js";
import launchBrowser from "../utils/puppeteerConfig.js";

async function returnSearchDetailsBasedOnDomain(domain, link) {
  console.log("domain:", domain);
  console.log("link:", link);

  const selectedDomain = selectors[domain];

  if (!selectedDomain) {
    console.error(`No selectors found for domain: ${domain}`);
    return [];
  }

  console.log("selectedDomain:", selectedDomain);

  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(link, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    const products = await page.evaluate((selectedDomain) => {
      let results = [];
      let more_info_product_image = [];
      let details_info = [];
      
      let description = document.querySelector(selectedDomain?.description)?.innerText?.trim() || "";
      let location = document.querySelector(selectedDomain?.location)?.innerText?.trim() || "";

      document.querySelectorAll(selectedDomain?.container).forEach((image) => {
        let imageElement = image.querySelector(selectedDomain?.image);
        let imageLink =
          imageElement?.getAttribute("src")?.split(",")[0]?.split(" ")[0] ||
          imageElement?.getAttribute("srcset")?.split(",")[0]?.split(" ")[0] ||
          "#";

        more_info_product_image.push(imageLink);
      });

      document.querySelectorAll(selectedDomain?.details).forEach((details) => {
        details_info.push({
          detail_title: details.querySelector(selectedDomain?.description_title)?.textContent?.trim() || "",
          details_value: details.querySelector(selectedDomain?.details__value)?.textContent?.trim() || "",
        });
      });

      return {
        more_info_product_image,
        details_info,
        description,
        location,
      };
    }, selectedDomain); // ✅ Pass `selectedDomain` into page.evaluate()

    return products;
  } catch (error) {
    console.error(`Error scraping ${domain}:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

export default returnSearchDetailsBasedOnDomain;
