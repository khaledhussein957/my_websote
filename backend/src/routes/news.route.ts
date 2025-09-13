import express from "express";

import { getNews, getNewsBySlug, createNews, updateNews, deleteNews } from "../controllers/news.controller.ts";

import { authMiddleware } from "../middlewares/protectRoute.ts";
import { uploadBlogImage } from "../middlewares/upload.ts";
import { createNewsValidate, updateNewsValidate } from "../middlewares/newsValidate.middleware.ts";

const router = express.Router();

router.get("/", getNews);
router.get("/:slug", getNewsBySlug);
router.post("/", authMiddleware, uploadBlogImage.array("image"), createNewsValidate, createNews);
router.put("/:id", authMiddleware, uploadBlogImage.array("image"), updateNewsValidate, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;