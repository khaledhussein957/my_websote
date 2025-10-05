import express from "express";

import { getEducations, getEducation, addEducation, updateEducation, deleteEducation } from "../controllers/education.controller";

import { authMiddleware } from "../middlewares/protectRoute";
import { addEducationValidate, updateEducationValidate } from "../middlewares/educationValidate.middleware";

const router = express.Router();

router.get("/", getEducations);
router.get("/:id", getEducation);
router.post("/", authMiddleware, addEducationValidate, addEducation);
router.put("/:id", authMiddleware, updateEducationValidate, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

export default router;