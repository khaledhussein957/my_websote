import type { Request, Response, NextFunction } from "express";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../validations/experience.validator";

export const addExperienceValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createExperienceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const updateExperienceValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateExperienceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};
