import express from "express";

import { authMiddleware } from "../middlewares/protectRoute.ts";
import upload from "../middlewares/upload.ts";
import {
  validateUpdateUser,
  validateChangePassword,
} from "../middlewares/userValidate.middleware.ts";

import {
  changePassword,
  updateAccount,
  deleteAccount,
} from "../controllers/user.controller.ts";

const router = express.Router();

router.put(
  "/update-account",
  authMiddleware,
  upload.single("image"),
  validateUpdateUser,
  updateAccount
);

router.put(
  "/update-password",
  authMiddleware,
  validateChangePassword,
  changePassword
);

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
