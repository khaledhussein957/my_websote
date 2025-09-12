import express from "express";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/category.controller.ts";

import { authMiddleware } from "../middlewares/protectRoute.ts";
import { validateCategory, validateCategoryUpdate } from "../middlewares/categoryValidate.middleware.ts";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authMiddleware, validateCategory, addCategory);
router.put("/:id", authMiddleware, validateCategoryUpdate, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;