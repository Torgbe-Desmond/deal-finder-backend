import launchBrowser from "../utils/puppeteerConfig.js";
import formatSearchUrl from "../utils/editQuery.js";
import generateRandomString from "../utils/generateRandomString.js";
import NotFound from "../Errors/Notfound.js";
import ErrorHandler from "../Errors/ErrorHandler.js";
import { v4 as uuidv4 } from "uuid";
const Handler = new ErrorHandler();

async function scrapeWebsite(
  site,
  query,
  category,
  selectors,
  maxPrice,
  minPrice
) {

  const browser = await launchBrowser();
  const page = await browser.newPage();
  const searchUrl = formatSearchUrl(
    site,
    query,
    `${category}`,
    maxPrice,
    minPrice
  );
  console.log(`Searching on ${site}: ${searchUrl}`);

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    const TIME_OUT = 300000;

    const enterQuerySites = {
      compughana: "https://www.compughana.com",
    };

    const dynamicSiteDomains = {
      tonaton: "https://tonaton.com",
      jumia: "https://www.jumia.com.gh",
      compughana: "https://compughana.com",
      melcom: "https://melcom.com",
      shopbeautybooth: "https://shopbeautybooth.com",
    };

    // Handle sites requiring manual input + submit
    if (site in enterQuerySites) {
      await page.goto(enterQuerySites[site], {
        waitUntil: "domcontentloaded",
        timeout: TIME_OUT,
      });

      await page.focus('input[name="q"]');
      await page.type('input[name="q"]', query);

      const typedQuery = await page.$eval('input[name="q"]', (el) => el.value);
      console.log(`Typed query: "${typedQuery}"`);

      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      ]);
    } else {
      await page.goto(searchUrl, {
        waitUntil: "domcontentloaded",
        timeout: TIME_OUT,
      });
    }

    const rawProducts = await page.evaluate(
      (selectors, site, siteLinks, query) => {
        const results = [];
        const queryTokens = query.toLowerCase().split(/\s+/);

        document
          .querySelectorAll(selectors.product__container)
          .forEach((item) => {
            const getText = (selector) =>
              item.querySelector(selector)?.innerText.trim() || "No data";

            const getImage = () =>
              item
                .querySelector(selectors.product__image)
                ?.getAttribute("data-src") ||
              item
                .querySelector(selectors.product__image)
                ?.getAttribute("src") ||
              "#";

            const product_link = item.querySelector(
              selectors.product__site__link
            )?.href;

            const product__description = getText(
              selectors.product__description
            );

            if (
              product__description !== "No data" &&
              queryTokens.every((token) =>
                product__description.toLowerCase().includes(token)
              )
            ) {
              results.push({
                product__image: getImage(),
                product__price: getText(selectors.product__price),
                product__location: getText(selectors.product__location),
                product__description,
                product__status: getText(selectors.product__status),
                product__link: product_link,
                domain: site,
              });
            }
          });

        return results.slice(0, 20);
      },
      selectors,
      site,
      dynamicSiteDomains,
      query
    );

    const products = rawProducts.map((product) => ({
      ...product,
      product__id: uuidv4(),
    }));

    if (!products || products.length < 1) {
      return [];
    }

    return products;
  } catch (error) {
    if (!Handler.isTrustedError(error)) {
      Handler.handleError(error);
    }
    throw error;
  } finally {
    await browser.close();
  }
}

export default scrapeWebsite;
