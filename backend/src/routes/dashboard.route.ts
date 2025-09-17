import express from "express";

import { DashboardStats } from  "../controllers/dashboard.controller.ts";

import { authMiddleware }from "../middlewares/protectRoute.ts";

const router = express.Router();

router.get("/stats", authMiddleware, DashboardStats);

export default router;