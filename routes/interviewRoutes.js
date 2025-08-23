import express from "express";
import { generateInterviewQuestions }  from "../controllers/interviewController.js";

const router = express.Router();

// POST /api/interview
router.post("/", generateInterviewQuestions);

export default router;
