import express from "express";

import { getTotalVisitsThisMonth, getVisit } from "../controllers/visit.controller";
import { authMiddleware } from "../middlewares/protectRoute";

const router = express.Router();

router.get("/total-this-month", authMiddleware, getTotalVisitsThisMonth);
router.get("/", authMiddleware, getVisit);

export default router;