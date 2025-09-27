import express from "express";

import { authMiddleware } from "../middlewares/protectRoute.ts";
import { uploadProfile } from "../middlewares/upload.ts";
import {
  validateUpdateUser,
  validateChangePassword,
} from "../middlewares/userValidate.middleware.ts";

import {
  getUsers,
  getUser,
  changePassword,
  updateAccount,
  deleteAccount,
} from "../controllers/user.controller.ts";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUser);

router.put(
  "/update-account",
  authMiddleware,
  uploadProfile.single("image"),
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
