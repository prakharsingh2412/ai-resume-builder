import express from "express";
import {summarizeText} from "../Controllers/summarizeController.js";

const router = express.Router();

// POST /api/summarize
router.post("/", summarizeText);

export default router;