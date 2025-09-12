import express from "express";
import { createExperience, getExperiences, updateExperience, deleteExperience } from "../controllers/experience.controller.ts";
import { authMiddleware } from "../middlewares/protectRoute.ts";
import { addExperienceValidate, updateExperienceValidate } from "../middlewares/experienceValidate.middleware.ts";

const router = express.Router();

router.post("/", authMiddleware, addExperienceValidate, createExperience);
router.get("/", getExperiences);
router.put("/:id", authMiddleware, updateExperienceValidate, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;