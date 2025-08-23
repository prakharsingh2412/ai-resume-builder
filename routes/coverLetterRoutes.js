import express from "express";
import {generateCoverLetter}  from "../controllers/coverLetterController.js";

const router = express.Router();

// POST /api/cover-letter
router.post("/", generateCoverLetter);

export default router;
