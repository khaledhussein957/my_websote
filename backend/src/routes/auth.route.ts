import express from "express";

import { registerAccountValidate, loginAccountValidate } from "../middlewares/authValidate.middleware.ts";
import { authMiddleware } from "../middlewares/protectRoute.ts";

import { registerAccount, loginAccount, checkAuth } from "../controllers/auth.controller.ts";

const router = express.Router();

router.post("/register", registerAccountValidate, registerAccount);
router.post("/login", loginAccountValidate, loginAccount);

router.get("/check-auth", authMiddleware, checkAuth);

export default router;