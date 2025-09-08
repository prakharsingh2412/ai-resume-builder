import express from "express";
import { auth } from "../middleware/auth.js";
import { generateResume, getResumes , getResumeById, updateResume, deleteResume ,uploadResume, scoreResume } from "../controllers/resumeController.js";
import upload from "../uploads/upload.js";

const router = express.Router();
router.use(auth);

router.post("/", generateResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);
router.post("/upload", upload.single("resume"), uploadResume);
router.post("/score", scoreResume);

export default router;
