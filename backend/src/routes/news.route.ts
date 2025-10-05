import express from "express";

import { getNews, getNewsBySlug, createNews, updateNews, deleteNews } from "../controllers/news.controller";

import { authMiddleware } from "../middlewares/protectRoute";
import { uploadBlogImage } from "../middlewares/upload";
import { createNewsValidate, updateNewsValidate } from "../middlewares/newsValidate.middleware";

const router = express.Router();

router.get("/", getNews);
router.get("/:slug", getNewsBySlug);
router.post("/", authMiddleware, uploadBlogImage.array("image"), createNewsValidate, createNews);
router.put("/:id", authMiddleware, uploadBlogImage.array("image"), updateNewsValidate, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;