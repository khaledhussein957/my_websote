import { type Request, type Response } from "express";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";

import Experience from "../models/experience.model.ts";
import Notification from "../models/notification.model.ts";

export const createExperience = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const { title, company, location, startYear, endYear, description } =
      req.body;
    if (!title || !company || !location || !startYear || !endYear) {
      return res
        .status(400)
        .json({
          message:
            "Title, Company, Location, Start Year and End Year are required",
          status: "error",
        });
    }

    // Check for duplicate experience (same title and company for the same user)
    const existingExperience = await Experience.findOne({
      user: userId,
      title,
      company,
    });
    if (existingExperience)
      return res
        .status(409)
        .json({
          message: "Experience with the same title and company already exists",
          status: "error",
        });

    const newExperience = new Experience({
      user: userId,
      title,
      company,
      location,
      startYear,
      endYear,
      description,
    });

    await newExperience.save();

    await Notification.create({
      userId,
      title: "New Experience Added",
      message: `You have successfully added a new experience: ${title} at ${company}.`,
      type: "success",
      isRead: false,
    });

    return res
      .status(201)
      .json({
        message: "Experience created successfully",
        status: "success",
        data: newExperience,
      });
  } catch (error) {
    console.log("❌ Error in createExperience:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Experiences fetched successfully",
      status: "success",
      data: experiences,
    });
  } catch (error) {
    console.log("❌ Error in experiences:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const experienceId = req.params.id;
    if (!experienceId)
      return res
        .status(400)
        .json({ message: "Experience ID is required", status: "error" });

    const experience = await Experience.findById(experienceId);
    if (!experience)
      return res
        .status(404)
        .json({ message: "Experience not found", status: "error" });

    return res.status(200).json({
      message: "Experience fetched successfully",
      status: "success",
      data: experience,
    });
  } catch (error) {
    console.log("❌ Error in getExperience:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const updateExperience = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const experienceId = req.params.id;
    if (!experienceId)
      return res
        .status(400)
        .json({ message: "Experience ID is required", status: "error" });

    const experience = await Experience.findById(experienceId);
    if (!experience)
      return res
        .status(404)
        .json({ message: "Experience not found", status: "error" });

    if (experience.user.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You can only update your own experiences",
          status: "error",
        });
    }

    const { title, company, location, startYear, endYear, description } =
      req.body;

    if (title) experience.title = title || experience.title;
    if (company) experience.company = company || experience.company;
    if (location) experience.location = location || experience.location;
    if (startYear) experience.startYear = startYear || experience.startYear;
    if (endYear) experience.endYear = endYear || experience.endYear;
    if (description)
      experience.description = description || experience.description;

    await experience.save();

    await Notification.create({
      userId,
      title: "Experience Updated",
      message: `You have successfully updated your experience: ${experience.title} at ${experience.company}.`,
      type: "info",
      isRead: false,
    });

    return res
      .status(200)
      .json({
        message: "Experience updated successfully",
        status: "success",
        data: experience,
      });
  } catch (error) {
    console.log("❌ Error in updateExperience:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const deleteExperience = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const experienceId = req.params.id;
    if (!experienceId)
      return res
        .status(400)
        .json({ message: "Experience ID is required", status: "error" });

    const experience = await Experience.findById(experienceId);
    if (!experience)
      return res
        .status(404)
        .json({ message: "Experience not found", status: "error" });

    if (experience.user.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You can only delete your own experiences",
          status: "error",
        });
    }

    const deletdExperience = await Experience.findByIdAndDelete(experienceId);
    if (!deletdExperience)
      return res
        .status(404)
        .json({ message: "Experience not found", status: "error" });

    await Notification.create({
      userId,
      title: "Experience Deleted",
      message: `You have successfully deleted your experience: ${experience.title} at ${experience.company}.`,
      type: "warning",
      isRead: false,
    });

    return res
      .status(200)
      .json({ message: "Experience deleted successfully", status: "success" });
  } catch (error) {
    console.log("❌ Error in deleteExperience:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
