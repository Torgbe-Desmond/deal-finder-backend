import express from "express";
import getProducts from "../domains/products/routes.js";
import testProducts from "../domains/test/routes.js";
const router = express.Router();

// version one of app
router.use("/api/v1", getProducts);
router.use("/api/v1", testProducts);

export default router;
