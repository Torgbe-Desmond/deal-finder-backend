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
  try {
    const [
      tonatonResult,
      jijiResults,
      jumiaResults,
      compughanaResults,
      kikuuResults,
      bayghResults,
      shopbeautyboothResults,
    ] = await Promise.all([
      scrapeWebsite("tonaton", query, category, tonatonSelectors),
      scrapeWebsite("jiji", query, category, jijiSelectors),
      scrapeWebsite("jumia", query, category, jumiaSelectors),
      scrapeWebsite("compughana", query, category, compuGhanaSelectors),
      scrapeWebsite("kikuu", query, category, kikuuSelectors),
      scrapeWebsite("baygh", query, category, bayghSelectors),
      scrapeWebsite(
        "shopbeautybooth",
        query,
        category,
        shopBeautyBoothSelectors
      ),
    ]);

    const combinedResults = [
      ...tonatonResult,
      ...jijiResults,
      ...jumiaResults,
      ...compughanaResults,
      ...kikuuResults,
      ...bayghResults,
      ...shopbeautyboothResults,
    ].sort((a, b) => a.price - b.price);

    return combinedResults;
  } catch (error) {
    console.log(error);
  }
}

export default getSearchResults;
