import express from "express";

import { getEducation, addEducation, updateEducation, deleteEducation } from "../controllers/education.controller.ts";

import { authMiddleware } from "../middlewares/protectRoute.ts";
import { addEducationValidate, updateEducationValidate } from "../middlewares/educationValidate.middleware.ts";

const router = express.Router();

router.get("/", getEducation);
router.post("/", authMiddleware, addEducationValidate, addEducation);
router.put("/:id", authMiddleware, updateEducationValidate, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

export default router;