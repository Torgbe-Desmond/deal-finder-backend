import express from "express";
import getProducts from "./controllers.js";
const router = express.Router();

// version one of app
router.post("/search", getProducts);

export default router;
