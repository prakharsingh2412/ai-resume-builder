import express from "express";
import { auth } from "../middleware/auth.js";
import { chatWithBot, getChatHistory } from "../controllers/chatbotController.js";

const router = express.Router();
router.use(auth);

router.post("/", chatWithBot);
router.get("/history", getChatHistory);

export default router;
