import express from "express";

import {
  registerAccountValidate,
  loginAccountValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
  resendResetCode,
} from "../middlewares/authValidate.middleware";
import { authMiddleware } from "../middlewares/protectRoute";

import {
  registerAccount,
  loginAccount,
  checkAuth,
  logout,
  forgotPassword,
  resetPassword,
  resendResetPasswordCode,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerAccountValidate, registerAccount);
router.post("/login", loginAccountValidate, loginAccount);
router.post("/logout", logout);

router.get("/check-auth", authMiddleware, checkAuth);

router.post("/forgot-password", forgotPasswordValidate, forgotPassword);
router.post("/reset-password", resetPasswordValidate, resetPassword);
router.post("/resend-code", resendResetCode, resendResetPasswordCode);

export default router;
