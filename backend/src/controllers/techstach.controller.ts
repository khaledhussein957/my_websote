import type { Request, Response } from "express";

import TechStack from "../models/techstack.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";

import cloudinary from "../config/cloudinary.ts";

export const getTechStacks = async (req: Request, res: Response) => {
  try {
    const techStacks = await TechStack.find().sort({ proficiency: -1 });
    res.status(200).json({ data: techStacks, status: "success" });
  } catch (error) {
    console.log("❌ Error in getTechStacks:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const createTechStack = async (
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

    const { name, proficiency, category } = req.body;
    if (!name || !proficiency)
      return res
        .status(400)
        .json({ message: "TechStack name is required", status: "error" });

    // Check if techStack with the same name already exists
    const existingTechStack = await TechStack.findOne({ name });
    if (existingTechStack) {
      return res
        .status(409)
        .json({
          message: "TechStack with this name already exists",
          status: "error",
        });
    }

    // check if category is exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: "Invalid category", status: "error" });
    }

    // check if proficiency is between 1 and 10
    if (proficiency < 1 || proficiency > 10) {
      return res
        .status(400)
        .json({
          message: "Proficiency must be between 1 and 5",
          status: "error",
        });
    }

    let iconUrl;
    if (req.file) {
      // Upload image to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "techstack-icon",
        });
        iconUrl = result.secure_url;
        console.log("✅ Image uploaded to Cloudinary:", iconUrl);
      } catch (error) {
        console.error("❌ Cloudinary upload error:", error);
        return res
          .status(500)
          .json({ message: "Image upload failed", status: "error" });
      }
    }

    const newTechStack = new TechStack({
      user: userId,
      name,
      icon: iconUrl,
      category,
      proficiency,
    });

    await newTechStack.save();
    res.status(201).json({ data: newTechStack, status: "success" });
  } catch (error) {
    console.log("❌ Error in createTechStack:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const updateTechStack = async (
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

    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "TechStack ID is required", status: "error" });

    const techStack = await TechStack.findById(id);
    if (!techStack)
      return res
        .status(404)
        .json({ message: "TechStack not found", status: "error" });

    // Only the user who created the techStack can update it
    if (techStack.user.toString() !== userId) {
      return res.status(403).json({
        message:
          "Forbidden: You don't have permission to update this techStack",
        status: "error",
      });
    }

    const { name, proficiency, category } = req.body;

    if (name) techStack.name = name || techStack.name;
    if (proficiency) {
      if (proficiency < 1 || proficiency > 10) {
        return res
          .status(400)
          .json({
            message: "Proficiency must be between 1 and 10",
            status: "error",
          });
      }
      techStack.proficiency = proficiency;
    }

    if (category) {
      // check if category is exists
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res
          .status(400)
          .json({ message: "Invalid category", status: "error" });
      }
      techStack.category = category;
    }

    if (req.file) {
      // Destroy previous image if exists
      if (techStack.icon) {
        try {
          const publicId = techStack.icon.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`techstack-icon/${publicId}`);
            console.log(`🗑️ successfully deleted the icon: ${publicId}`);
          }
        } catch (error) {
          console.error("❌ Failed to delete the icon:", error);
          return res
            .status(500)
            .json({ message: "Failed to delete the icon", status: "error" });
        }

        // Upload new image to Cloudinary
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "techstack-icon",
          });
          techStack.icon = result.secure_url;
          console.log("✅ Image uploaded to Cloudinary:", techStack.icon);
        } catch (error) {
          console.error("❌ Cloudinary upload error:", error);
          return res
            .status(500)
            .json({ message: "Image upload failed", status: "error" });
        }
      }
    }

    await techStack.save();
    res.status(200).json({ data: techStack, status: "success" });
  } catch (error) {
    console.log("❌ Error in updateTechStack:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const deleteTechStack = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "TechStack ID is required", status: "error" });

    const techStack = await TechStack.findById(id);
    if (!techStack)
      return res
        .status(404)
        .json({ message: "TechStack not found", status: "error" });

    // Only the user who created the techStack can delete it
    if (techStack.user.toString() !== userId) {
      return res.status(403).json({
        message:
          "Forbidden: You don't have permission to delete this techStack",
        status: "error",
      });
    }

    // delete the icon
    // Destroy previous image if exists
    if (techStack.icon) {
      // Delete old image from Cloudinary
      const publicId = techStack.icon.split("/").pop()?.split(".")[0];
      try {
        if (publicId) {
          await cloudinary.uploader.destroy(`techstack-icon/${publicId}`);
          console.log(`🗑️ successfully deleted the icon: ${publicId}`);
        }
      } catch (error) {
        console.error("❌ Failed to delete the icon:", error);
        return res
          .status(500)
          .json({ message: "Failed to delete the icon", status: "error" });
      }
    }

    await TechStack.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "TechStack deleted successfully", status: "success" });
  } catch (error) {
    console.log("❌ Error in deleteTechStack:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};
