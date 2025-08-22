import express from "express";
import {generateResume}  from "../Controllers/resumeController.js";

const router = express.Router();

// POST /api/resume
router.post("/", generateResume);

export default router;
