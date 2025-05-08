"use strict";
import SuccessResponseObject from "./utils/successResponseObject.js";
import getSearchResults from "./utils/getSearchResults.js";
import cors from "cors";
import express from "express";
import recursiveScrapeWebsite from "./scrappers/recursiveScrapeWebsite.js";
import TubeNinjaScrapper from "./scrappers/TubeNinjaScrapper.js";
import { tubeNinjaSelectors } from "./utils/socialSelectors.js";
import TubeNinjaSelectors from "./utils/tubeNinjaSelectors.js";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/search", async (req, res) => {
  const { category, query } = req.query;
  const selectedScrapers = req.body.selectedScrapers;
  try {
    const response = await getSearchResults(
      query.toLocaleLowerCase(),
      category.toLocaleLowerCase(),
      selectedScrapers
    );
    const responsObject = new SuccessResponseObject(
      response,
      "Search results",
      true
    );
    res.status(200).json(responsObject);
  } catch (error) {
    console.log(error);
  }
});

app.post("/tube-ninja", async (req, res) => {
  try {
    const url = req.body.url;
    console.log(url);
    const handler = new TubeNinjaScrapper(
      new TubeNinjaSelectors({
        inputField: ".form-control",
        submitButton: ".btn-success", 
        titleSection: ".notopmargin", 
        downloadLinksSection: ".list-group a", 
        listGroupContainer: ".list-group", 
        ageLimitButton: ".agelimit .age-prompt .btn-success", 
      })
    );
    const response = await handler.run(url);
    const responseObject = new SuccessResponseObject(
      response,
      "Search results",
      true
    );
    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
  }
});

app.post("/recursive-search", async (req, res) => {
  const { link, domain } = req.body;

  try {
    const response = await recursiveScrapeWebsite(domain, link);
    const responsObject = new SuccessResponseObject(
      response,
      "Search results",
      true
    );
    res.status(200).json(responsObject);
  } catch (error) {
    console.log(error);
  }
});

app.get("", async (req, res) => {
  res.send("I love to hit you hard daddy");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
