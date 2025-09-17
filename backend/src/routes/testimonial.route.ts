import express from "express";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.ts";

import { createTestimonialValidate, updateTestimonialValidate } from "../middlewares/testimonialValidate.middleware.ts";
import { authMiddleware } from "../middlewares/protectRoute.ts";
import { uploadTestimonialImage } from "../middlewares/upload.ts";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonialValidate, uploadTestimonialImage.single("image") , addTestimonial);
router.put("/:testimonialId", authMiddleware, updateTestimonialValidate, updateTestimonial);
router.delete("/:testimonialId", authMiddleware, deleteTestimonial);

export default router;