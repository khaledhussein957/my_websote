import type { Request, Response, NextFunction } from "express";
import { createTestimonialSchema, updateTestimonialSchema } from "../validations/testimonial.validator";

export const createTestimonialValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createTestimonialSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0]?.message });
  }
  next();
};

export const updateTestimonialValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateTestimonialSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0]?.message });
  }
  next();
};
