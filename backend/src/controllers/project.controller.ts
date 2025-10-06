import type { Request, Response } from "express";

import Project from "../models/project.model";
import User from "../models/user.model";
import TechStack from "../models/techstack.model";
import Notification from "../models/notification.model";

import cloudinary from "../config/cloudinary";

import type { AuthenticatedRequest } from "../middlewares/protectRoute";
import mongoose from "mongoose";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .populate("techStack", "name")
      .populate("user", "name email title")
      .sort({ createdAt: -1 });

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found", status: "error" });
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.log("❌ Error in getProjects:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const { title, description, githubUrl, liveDemoUrl, techStack, type } =
      req.body;
    if (
      !title ||
      !description ||
      !techStack ||
      !type ||
      techStack.length === 0
    ) {
      return res.status(400).json({
        message: "Title, description, type, and techStack are required",
        status: "error",
      });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    // Validate techStack IDs
    for (const techId of techStack) {
      const tech = await TechStack.findById(techId);
      if (!tech) {
        return res.status(400).json({
          message: `Invalid techStack ID: ${techId}`,
          status: "error",
        });
      }
    }

    let imageUrl;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "projects",
        });
        imageUrl = result.secure_url;
        console.log("✅ Image uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.log("❌ Error uploading image:", error);
        return res
          .status(500)
          .json({ message: "Server Error", status: "error" });
      }
    }

    const newProject = new Project({
      user: userId,
      title,
      description,
      githubUrl,
      type,
      liveDemoUrl,
      techStack,
      image: imageUrl,
    });

    await newProject.save();

    await Notification.create({
      userId: user._id,
      title: "New Project Created",
      message: `Your project "${newProject.title}" has been created successfully.`,
      type: "success",
      isRead: false,
    });

    res.status(201).json({
      data: newProject,
      status: "success",
      message: "Project created successfully",
    });
  } catch (error) {
    console.log("❌ Error in createProject:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const updateProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const projectId = req.params.id;
    if (!projectId)
      return res
        .status(400)
        .json({ message: "Project ID is required", status: "error" });

    const project = await Project.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ message: "Project not found", status: "error" });

    console.log(project.user, userId);
    console.log(project);

    if (
      project.user.toString() !== userId &&
      project.user._id?.toString() !== userId
    ) {
      return res.status(403).json({
        message: "Forbidden: You can only update your own projects",
        status: "error",
      });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const {
      title,
      description,
      githubUrl,
      liveDemoUrl,
      techStack,
      featured,
      type,
    } = req.body;

    if (title) project.title = title;
    if (description) project.description = description;
    if (githubUrl) project.githubUrl = githubUrl;
    if (liveDemoUrl) project.liveDemoUrl = liveDemoUrl;
    if (type) project.type = type;
    if (typeof featured === "boolean") {
      project.featured = featured;
    }

    // --- Handle techStack safely ---
    let techIds: string[] = [];

    if (techStack) {
      let techIds: string[] = [];

      // Handle stringified or array input safely
      if (typeof techStack === "string") {
        try {
          techIds = JSON.parse(techStack);
        } catch {
          techIds = [techStack];
        }
      } else if (Array.isArray(techStack)) {
        techIds = techStack;
      }

      // Filter out invalid values
      techIds = techIds.filter((id) => id && id !== "undefined");

      if (techIds.length > 0) {
        // Validate all tech IDs in one query
        const validTechs = await TechStack.find({ _id: { $in: techIds } });

        if (validTechs.length !== techIds.length) {
          return res.status(400).json({
            message: "One or more invalid techStack IDs",
            status: "error",
          });
        }

        // Convert strings to ObjectIds before assigning
        project.techStack = techIds.map(
          (id) => new mongoose.Types.ObjectId(id)
        );
      }
    }

    // --- Handle image upload ---
    if (req.file) {
      // Delete old image if exists
      if (project.image) {
        try {
          const publicId = project.image.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`projects/${publicId}`);
            console.log(`🗑️ Deleted old project image: ${publicId}`);
          }
        } catch (error) {
          console.log("❌ Error deleting old image:", error);
        }
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "projects",
        });
        project.image = result.secure_url;
        console.log("✅ Image uploaded to Cloudinary:", project.image);
      } catch (error) {
        console.log("❌ Error uploading image:", error);
        return res
          .status(500)
          .json({ message: "Failed to upload image", status: "error" });
      }
    }

    await project.save();

    // Create notification
    await Notification.create({
      userId: user._id,
      title: "Project Updated",
      message: `Your project "${project.title}" has been updated successfully.`,
      type: "info",
      isRead: false,
    });

    res.status(200).json({
      data: project,
      status: "success",
      message: "Project updated successfully",
    });
  } catch (error) {
    console.log("❌ Error in updateProject:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};

export const deleteProject = async (
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

    const projectId = req.params.id;
    if (!projectId)
      return res
        .status(400)
        .json({ message: "Project ID is required", status: "error" });

    const project = await Project.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ message: "Project not found", status: "error" });

    console.log(`${project.user} vs ${userId}`);    

    if (project.user.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden: You can only delete your own projects",
        status: "error",
      });
    }

    if (project.image) {
      // Delete old image from Cloudinary
      const publicId = project.image.split("/").pop()?.split(".")[0];
      try {
        if (publicId) {
          await cloudinary.uploader.destroy(`projects/${publicId}`);
          console.log(
            `🗑️ successfully deleted the project images: ${publicId}`
          );
        }
      } catch (error) {
        console.error("❌ Failed to delete the project images:", error);
        return res.status(500).json({
          message: "Failed to delete the project images",
          status: "error",
        });
      }
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject)
      return res
        .status(404)
        .json({ message: "Project not found", status: "error" });

    await Notification.create({
      userId: user._id,
      title: "Project Deleted",
      message: `Your project titled "${project.title}" has been deleted.`,
      type: "warning",
      isRead: false,
    });

    return res
      .status(200)
      .json({ message: "Project deleted successfully", status: "success" });
  } catch (error) {
    console.log("❌ Error in deleteProject:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};
