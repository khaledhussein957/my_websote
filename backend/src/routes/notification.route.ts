import express  from "express";

import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../controllers/notification.controller.ts"
import {authMiddleware} from "../middlewares/protectRoute.ts";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.patch("/mark-all-read", authMiddleware, markAllNotificationsAsRead);
router.patch("/:notificationId/mark-read", authMiddleware, markNotificationAsRead);

export default router;