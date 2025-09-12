import type { Request, Response, NextFunction } from "express";
import {
  techStackSchema,
  techStackUpdateSchema,
} from "../validations/techstack.validation.ts";

export const validateTechStack = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = techStackSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, status: "error" });
  }
  next();
};

export const validateTechStackUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = techStackUpdateSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, status: "error" });
  }
  next();
};
