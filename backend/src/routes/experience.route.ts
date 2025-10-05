import express from "express";
import { createExperience, getExperiences, getExperience, updateExperience, deleteExperience } from "../controllers/experience.controller";
import { authMiddleware } from "../middlewares/protectRoute";
import { addExperienceValidate, updateExperienceValidate } from "../middlewares/experienceValidate.middleware";

const router = express.Router();

router.post("/", authMiddleware, addExperienceValidate, createExperience);
router.get("/", getExperiences);
router.get("/:id", getExperience);
router.put("/:id", authMiddleware, updateExperienceValidate, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;