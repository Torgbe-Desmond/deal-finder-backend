"use strict";
import cors from "cors";
import express from "express";
import errorMiddleware from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import ErrorHandler from "./Errors/ErrorHandler.js";
import connectMongoDB from "./config/database.js";
const Handler = new ErrorHandler();
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

// Routes
app.use(routes);

// Custom middleware for handling errors
app.use(errorMiddleware);
app.use(notFound);

// Start server
const start = async () => {
  try {
    await connectMongoDB(process.env.MONGO_DB_URL);
    app.listen(PORT, () => {
      console.info(`App is running on port ${PORT}`);
    });
  } catch (error) {
    if (!Handler.isTrustedError(error)) {
      Handler.handleError(error);
    }
    console.log(error);
  }
};

start();
