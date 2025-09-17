import type { Response } from "express";

import Visit from "../models/visit.model.ts";
import Notification from "../models/notification.model.ts";
import User from "../models/user.model.ts";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.js";

// ✅ Total visits this month
export const getTotalVisitsThisMonth = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "false" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "false" });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const count = await Visit.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    res.status(200).json({ totalVisitsThisMonth: count, status: "true" });
  } catch (error) {
    console.log("❌ Error getting total visits this month:", error);
    res.status(500).json({ message: "Internal server error", status: "false" });
  }
};

// ✅ Get last 100 visits with extra device info
export const getVisit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "false" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "false" });

    // Fetch last 100 visits with full info
    const visits = await Visit.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select("ip url method userAgent browser os device createdAt");

    if (!visits || visits.length === 0)
      return res
        .status(404)
        .json({ message: "No visits found", status: "false" });

    // Create a notification
    await Notification.create({
      user: user._id,
      title: "New Visit Recorded",
      message: `Latest visit: ${visits[0].ip} via ${visits[0].browser}`,
      type: "info",
      isRead: false,
    });

    res.status(200).json({ visits, status: "true" });
  } catch (error) {
    console.log("❌ Error getting visit logs:", error);
    res.status(500).json({ message: "Internal server error", status: "false" });
  }
};
