import NotFound from "../../Errors/Notfound.js";
import SuccessResponseObject from "../../utils/successResponseObject.js";
import BadRequest from "../../Errors/BadRequest.js";
import getSearchResults from "../../utils/getSearchResults.js";
import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../../Errors/ErrorHandler.js";
import Selectors from "./model.js";

const Handler = new ErrorHandler();

const getProducts = async (req, res, next) => {
  const { category, query, maxPrice, minPrice } = req.query;
  const selectedScrapers = req.body.selectedScrapers;
  try {
    let scrapers = await Selectors.find({});

    scrapers = scrapers.filter((s) => s.name !== "jiji");

    console.log(scrapers)

    if (!query || typeof query !== "string") {
      throw new BadRequest(`Please enter a valid search query`, true);
    }

    const response = await getSearchResults(
      query.toLowerCase(),
      category.toLowerCase(),
      selectedScrapers,
      maxPrice,
      minPrice,
      scrapers
    );

    if (response.length < 1) {
      throw new NotFound(`No product found for the query "${query}"`, true);
    }

    const responseObject = new SuccessResponseObject(
      response,
      "Search results",
      true
    );

    return res.status(StatusCodes.OK).json(responseObject);
  } catch (error) {
    if (!Handler.isTrustedError(error)) {
      Handler.handleError(error);
    }
    next(error);
  }
};

export default getProducts;
