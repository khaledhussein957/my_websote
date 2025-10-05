import { type NextFunction, type Request, type Response } from "express";
import {
  registerAccount,
  loginAccount,
  forgotPasswordAccount,
  resetPasswordAccount,
  resendCode,
} from "../validations/auth.validator";

export const registerAccountValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerAccount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const loginAccountValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginAccount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const forgotPasswordValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = forgotPasswordAccount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const resetPasswordValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = resetPasswordAccount.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};

export const resendResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = resendCode.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, status: "error" });
  }
  next();
};
