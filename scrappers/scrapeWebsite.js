import launchBrowser from "../utils/puppeteerConfig.js";
import formatSearchUrl from "../utils/editQuery.js";
import generateRandomString from "../utils/generateRandomString.js";

async function scrapeWebsite(site, query, category, selectors) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  const searchUrl = formatSearchUrl(site, query, category);
  console.log(`Searching on ${site}:`, searchUrl);

  // Set User-Agent to avoid bot detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    let listOfSitesToPressEnter = {
      compughana: "https://www.compughana.com",
    };

    let listOfDynamicSiteLinks = {
      kikuu: "https://www.kikuu.com.gh",
      tonaton: "https://tonaton.com",
      jumia: "https://www.jumia.com.gh",
      jiji: "https://jiji.com.gh",
      compughana: "https://compughana.com",
      melcom: "https://melcom.com",
      shopbeautybooth: "https://shopbeautybooth.com",
    };

    const TIME_OUT = 120000;

    if (site in listOfSitesToPressEnter) {
      // Go to the homepage of Jumia or CompuGhana
      await page.goto(listOfSitesToPressEnter[site], {
        waitUntil: "domcontentloaded",
        timeout: TIME_OUT,
      });

      // Type the search query
      await page.focus('input[name="q"]');
      await page.type('input[name="q"]', query);

      // Verify the query was typed
      const typedQuery = await page.evaluate(() => {
        return document.querySelector('input[name="q"]').value;
      });
      console.log(`Typed query: "${typedQuery}"`);

      // Click search button
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      ]);

      console.log(`Searching for '${query}' on ${site}...`);
    } else {
      await page.goto(searchUrl, {
        waitUntil: "domcontentloaded",
        timeout: TIME_OUT,
      });
    }

    const products = await page.evaluate(
      (selectors, site, listOfDynamicSiteLinks) => {
        try {
          const results = [];
          document.querySelectorAll(selectors.product__container).forEach((item) => {
            const product__description =
              item.querySelector(selectors.product__description)?.innerText.trim() ||
              "No title";

            const product__image =
              item.querySelector(selectors.product__image)?.getAttribute("data-src") ||
              item.querySelector(selectors.product__image)?.getAttribute("src") ||
              "#";

            const product__price =
              item.querySelector(selectors.product__price)?.innerText.trim() ||
              "No price";

            const product__location =
              item.querySelector(selectors.product__location)?.innerText.trim() ||
              "No location";

            const product__status =
              item.querySelector(selectors.product__status)?.innerText.trim() ||
              "No status";

            if (product__description !== "No title") {
              results.push({
                product__image,
                product__price,
                product__location,
                product__description,
                product__status,
                domain: site,
              });
            }
          });

          console.log(`Scraped ${results.length} products from ${site}`);
          return results.slice(0, 5);
        } catch (error) {
          console.error("Error during page evaluation:", error);
          return [];
        }
      },
      selectors,
      site,
      listOfDynamicSiteLinks
    );

    if (!products || products.length === 0) {
      console.warn(`No products found for ${site}`);
    }

    return products;
  } catch (error) {
    console.error(`Error scraping ${site}:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

export default scrapeWebsite;
