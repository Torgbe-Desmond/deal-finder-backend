import scrapeWebsite from "../scrappers/scrapeWebsite.js";
import ErrorHandler from "../Errors/ErrorHandler.js";
import BadRequest from "../Errors/BadRequest.js";
const Handler = new ErrorHandler();

async function getSearchResults(
  query,
  category,
  selectedScrapers,
  maxPrice,
  minPrice,
  scrapers
) {
  try {
    if (!query || !category) {
      throw new BadRequest("Query and category are required.", true);
    }

    const allowedScrapers =
      selectedScrapers.length > 0
        ? scrapers.filter((scraper) => selectedScrapers.includes(scraper.name))
        : [...scrapers];

    let combinedResults = [];
    const BATCH_SIZE = 3;

    for (let i = 0; i < allowedScrapers.length; i += BATCH_SIZE) {
      const batch = allowedScrapers
        .slice(i, i + BATCH_SIZE)
        .map(
          async ({
            name,
            product__container,
            product__image,
            product__price,
            product__location,
            product__description,
            product__status,
            product__site__link,
          }) => {
            const selectors = {
              product__container: product__container,
              product__image: product__image,
              product__price: product__price,
              product__location: product__location,
              product__description: product__description,
              product__status: product__status,
              product__site__link: product__site__link,
            };
            return scrapeWebsite(
              name,
              query,
              category,
              selectors,
              maxPrice,
              minPrice
            );
          }
        );

      const results = await Promise.all(batch);
      combinedResults.push(...results.flat());
      return combinedResults.sort(
        (a, b) => a?.product__price - b?.product__price
      );
    }
  } catch (error) {
    if (!Handler.isTrustedError(error)) {
      Handler.handleError(error);
    }
    throw error;
  }
}

export default getSearchResults;
