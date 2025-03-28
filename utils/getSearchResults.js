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
  // scrapping two websites at a time
  for (let i = 0; i < scrapers.length; i += 3) {
    const batch = scrapers
      .slice(i, i + 3)
      .map(({ name, selectors }) =>
        scrapeWebsite(name, query, category, selectors).catch(() => [])
      );
    const results = await Promise.all(batch);
    combinedResults.push(...results.flat());
  }

  return combinedResults.sort((a, b) => a.price - b.price);
}

export default getSearchResults;
