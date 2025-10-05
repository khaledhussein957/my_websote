import type { Request, Response } from "express";

import User from "../models/user.model";
import Notification from "../models/notification.model";

import type { AuthenticatedRequest } from "../middlewares/protectRoute";

export const getNotifications = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const notifications = await Notification.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to the latest 50 notifications

    if (notifications.length === 0)
      return res.status(200).json({
        message: "No notifications found",
        status: "success",
        data: [],
      });

    res.status(200).json({
      message: "Notifications fetched successfully",
      status: "success",
      data: notifications,
    });
  } catch (error) {
    console.log("❌ Error in getNotifications:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const markNotificationAsRead = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const { notificationId } = req.params;
    if (!notificationId)
      return res
        .status(400)
        .json({ message: "Notification ID is required", status: "error" });

    const notification = await Notification.findOne({
      _id: notificationId,
      userId: user._id,
    });

    if (!notification)
      return res
        .status(404)
        .json({ message: "Notification not found", status: "error" });

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      status: "success",
      data: notification,
    });
  } catch (error) {
    console.log("❌ Error in markNotificationAsRead:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const markAllNotificationsAsRead = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const result = await Notification.updateMany(
      { userId: user._id, isRead: false },
      { isRead: true }
    );
    if (result.modifiedCount === 0) {
      return res.status(200).json({
        message: "All notifications are already marked as read",
        status: "success",
      });
    }

    res.status(200).json({
      message: "All notifications marked as read",
      status: "success",
    });
  } catch (error) {
    console.log("❌ Error in markAllNotificationsAsRead:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};