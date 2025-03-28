import SuccessResponseObject from "./utils/successResponseObject.js";
import getSearchResults from "./utils/getSearchResults.js";
import cors from "cors";
import express from "express";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/search", async (req, res) => {
  const { category, query } = req.query;
  console.log("query", query.toLocaleLowerCase());
  console.log("category", category.toLocaleLowerCase());
  try {
    const response = await getSearchResults(
      query.toLocaleLowerCase(),
      category.toLocaleLowerCase()
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

app.get("/recursive-search", async (req, res) => {
  const { link, domain } = req.body;

  try {

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

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
