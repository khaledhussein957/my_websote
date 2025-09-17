import express from "express";

import {
  registerAccountValidate,
  loginAccountValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
} from "../middlewares/authValidate.middleware.ts";
import { authMiddleware } from "../middlewares/protectRoute.ts";

import {
  registerAccount,
  loginAccount,
  checkAuth,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.ts";

const router = express.Router();

router.post("/register", registerAccountValidate, registerAccount);
router.post("/login", loginAccountValidate, loginAccount);
router.post("/logout", logout);

router.get("/check-auth", authMiddleware, checkAuth);

router.post("/forgot-password", forgotPasswordValidate, forgotPassword);
router.post("/reset-password", resetPasswordValidate, resetPassword);

export default router;
