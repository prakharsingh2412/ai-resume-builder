import express from "express";
import { auth } from "../middleware/auth.js";
import { generateCoverLetter, getCoverLetters, getCoverLetterById, updateCoverLetter, deleteCoverLetter } from "../controllers/coverLetterController.js";

const router = express.Router();
router.use(auth);

router.post("/", generateCoverLetter);
router.get("/", getCoverLetters);
router.get("/:id", getCoverLetterById);
router.put("/:id", updateCoverLetter);
router.delete("/:id", deleteCoverLetter);

export default router;
