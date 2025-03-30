import scrapeWebsite from "../scrappers/scrapeWebsite.js";
import {
  bayghSelectors,
  compuGhanaSelectors,
  jijiSelectors,
  jumiaSelectors,
  kikuuSelectors,
  tonatonSelectors,
  shopBeautyBoothSelectors,
} from "./selectors.js";

async function getSearchResults(query, category, selectedScrapers) {
  // Validate inputs
  if (!query || !category) {
    throw new Error("Query and category are required.");
  }

  const scrapers = [
    { name: "tonaton", selectors: tonatonSelectors },
    { name: "jiji", selectors: jijiSelectors },
    { name: "jumia", selectors: jumiaSelectors },
    { name: "compughana", selectors: compuGhanaSelectors },
    { name: "kikuu", selectors: kikuuSelectors },
    { name: "baygh", selectors: bayghSelectors },
    { name: "shopbeautybooth", selectors: shopBeautyBoothSelectors },
  ];

  // Determine which scrapers to use
  const allowedScrapers =
    selectedScrapers.length > 0
      ? scrapers.filter((scraper) => selectedScrapers.includes(scraper.name))
      : [...scrapers];

  let combinedResults = [];
  const BATCH_SIZE = 3; // You can adjust this value

  // Scraping in batches
  for (let i = 0; i < allowedScrapers.length; i += BATCH_SIZE) {
    const batch = allowedScrapers
      .slice(i, i + BATCH_SIZE)
      .map(async ({ name, selectors }) => {
        console.log("selectors", selectors);
        return scrapeWebsite(name, query, category, selectors).catch((err) => {
          console.error(`Error scraping ${name}:`, err);
          return [];
        });
      });

    try {
      const results = await Promise.all(batch);
      combinedResults.push(...results.flat());
      return combinedResults.sort(
        (a, b) => a?.product__price - b?.product__price
      );
    } catch (error) {
      console.error("Error processing batch:", error);
    }
  }
}

export default getSearchResults;
