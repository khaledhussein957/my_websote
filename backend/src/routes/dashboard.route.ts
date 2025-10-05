import express from "express";

import { DashboardStats } from  "../controllers/dashboard.controller";

import { authMiddleware }from "../middlewares/protectRoute";

const router = express.Router();

router.get("/stats", authMiddleware, DashboardStats);

export default router;