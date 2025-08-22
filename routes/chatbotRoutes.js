import express from "express";
import {chatWithBot}  from "../Controllers/chatbotController.js";

const router = express.Router();

// POST /api/chatbot
router.post("/", chatWithBot);

export default router;
