import type { Request, Response } from "express";

import Project from "../models/project.model.ts";
import User from "../models/user.model.ts";
import TechStack from "../models/techStack.model.ts";
import Notification from "../models/notification.model.ts";

import cloudinary from "../config/cloudinary.ts";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";

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

    const { title, description, githubUrl, liveDemoUrl, techStack } = req.body;
    if (!title || !description || !techStack || techStack.length === 0) {
      return res.status(400).json({
        message: "Title, description, and techStack are required",
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

    if (project.user.toString() !== userId) {
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

    const { title, description, githubUrl, liveDemoUrl, techStack } = req.body;

    if (title) project.title = title || project.title;
    if (description) project.description = description || project.description;
    if (githubUrl) project.githubUrl = githubUrl || project.githubUrl;
    if (liveDemoUrl) project.liveDemoUrl = liveDemoUrl || project.liveDemoUrl;
    if (techStack && techStack.length > 0) {
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
      project.techStack = techStack;
    }

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (project.image) {
        try {
          const publicId = project.image.split("/").pop()?.split(".")[0];
          if (!publicId) return;
          await cloudinary.uploader.destroy(`projects/${publicId}`);
          console.log(
            `🗑️ successfully deleted the old project image: ${publicId}`
          );
        } catch (error) {
          console.log("❌ Error deleting image from Cloudinary:", error);
          return res
            .status(500)
            .json({ message: "Filed to delete image", status: "error" });
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
          .json({ message: "Server Error", status: "error" });
      }
    }

    await project.save();

    await Notification.create({
      userId: user._id,
      title: "Project Updated",
      message: `Your project "${project.title}" has been updated successfully.`,
      type: "info",
      isRead: false,
    });

    res
      .status(200)
      .json({
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
  } catch (error) {
    console.log("❌ Error in deleteProject:", error);
    res.status(500).json({ message: "Server Error", status: "error" });
  }
};
