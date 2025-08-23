import express from "express";
import { auth } from "../middleware/auth.js";
import { generateResume, getResumes , getResumeById, updateResume, deleteResume } from "../controllers/resumeController.js";

const router = express.Router();
router.use(auth);

router.post("/", generateResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
