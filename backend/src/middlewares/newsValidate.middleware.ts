import type { Request, Response, NextFunction } from "express";

import {
  createNewsSchema,
  updateNewsSchema,
} from "../validations/news.validator";

export const createNewsValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createNewsSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0]?.message, status: "error" });
  }
  next();
};

export const updateNewsValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateNewsSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0]?.message, status: "error" });
  }
  next();
};
