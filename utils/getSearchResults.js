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

async function getSearchResults(query, category) {
  const scrapers = [
    { name: "tonaton", selectors: tonatonSelectors },
    { name: "jiji", selectors: jijiSelectors },
    { name: "jumia", selectors: jumiaSelectors },
    { name: "compughana", selectors: compuGhanaSelectors },
    { name: "kikuu", selectors: kikuuSelectors },
    { name: "baygh", selectors: bayghSelectors },
    { name: "shopbeautybooth", selectors: shopBeautyBoothSelectors },
  ];

  let combinedResults = [];

  for (const { name, selectors } of scrapers) {
    try {
      const result = await scrapeWebsite(name, query, category, selectors);
      if (Array.isArray(result) && result.length > 0) {
        combinedResults.push(...result);
      } else {
        continue;
      }
    } catch (error) {
      console.error(`Error scraping ${name}:`, error);
    }
  }

  return combinedResults.sort((a, b) => a.price - b.price);
}

export default getSearchResults;
