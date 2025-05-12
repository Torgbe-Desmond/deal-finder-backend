import express from "express";
import test from "./controllers.js";
const router = express.Router();

// version one of app
router.get("/test", test);

export default router;
