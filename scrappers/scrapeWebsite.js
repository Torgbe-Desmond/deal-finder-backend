import launchBrowser from "../utils/puppeteerConfig.js";
import formatSearchUrl from "../utils/editQuery.js";

async function scrapeWebsite(site, query, category, selectors) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  const searchUrl = formatSearchUrl(site, query, category);
  console.log(`Searching on ${site}:`, searchUrl);

  try {
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    const products = await page.evaluate(
      (selectors, site) => {
        const results = [];
        document.querySelectorAll(selectors.container).forEach((item) => {
          const product__description =
            item.querySelector(selectors.description)?.innerText.trim() ||
            "No title";
          const product__image =
            item.querySelector(selectors.image)?.getAttribute("src") ||
            item
              .querySelector(".b-list-advert-base__img picture source")
              ?.getAttribute("srcset")
              ?.split(",")[0]
              .split(" ")[0] ||
            "#";
          const product__price =
            item.querySelector(selectors.price)?.innerText.trim() || "No price";
          const product__location =
            item.querySelector(selectors.location)?.innerText.trim() ||
            "No location";
          const product__status =
            item.querySelector(selectors.status)?.innerText.trim() ||
            "No status";
          const siteLink =
            item.querySelector(selectors.link)?.href || "No link";

          if (product__description !== "No title") {
            results.push({
              product__image,
              product__price,
              product__location,
              product__description,
              product__status,
              siteLink,
              domain: site,
            });
          }
        });
        return results.slice(0, 5);
      },
      selectors,
      site
    );

    return products;
  } catch (error) {
    console.log(`${error.name}:${error.message}`)
    return [];
  } finally {
    await browser.close();
  }
}

export default scrapeWebsite;
