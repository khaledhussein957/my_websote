import type { Request, Response, NextFunction } from "express";
import {
  addEducation,
  updateEducation,
} from "../validations/education.validator.ts";

export const addEducationValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = addEducation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const updateEducationValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateEducation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};
