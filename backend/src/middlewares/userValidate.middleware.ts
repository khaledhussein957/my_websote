import type { Request, Response, NextFunction } from "express";
import { updateAccount, changePassword } from "../validations/user.validator.ts";

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateAccount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0]?.message });
  }
  next();
};

export const validateChangePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0]?.message });
  }
  next();
};
