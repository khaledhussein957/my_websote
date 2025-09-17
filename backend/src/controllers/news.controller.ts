import type { Request, Response } from "express";

import News from "../models/news.model.ts";
import User from "../models/user.model.ts";
import Notification from "../models/notification.model.ts";

import cloudinary from "../config/cloudinary.ts";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find({}).populate("user");

    if (news.length === 0) {
      return res.status(404).json({ message: "No news found" });
    }

    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNewsBySlug = async (req: Request, res: Response) => {
  try {
    const news = await News.findOne({ slug: req.params.slug }).populate("user");

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNews = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const { title, description, eventAt } = req.body;
    if (!title || !description || !eventAt) {
      return res.status(400).json({
        message: "Title, description, and event date are required",
        status: "error",
      });
    }

    // ✅ Ensure unique title
    const existingNews = await News.findOne({ title });
    if (existingNews) {
      return res.status(409).json({
        message: "News with the same title already exists",
        status: "error",
      });
    }

    // ✅ Generate slug
    let slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    // Optionally add timestamp to ensure uniqueness
    slug = `${slug}-${Date.now()}`;

    let images: string[] = [];

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      try {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "news",
          });
          images.push(result.secure_url);
        }
      } catch (error) {
        console.error("❌ Failed to upload news images:", error);
        return res.status(500).json({
          message: "Failed to upload news images",
          status: "error",
        });
      }
    }

    const news = await News.create({
      user: user._id, // ✅ store reference, not whole object
      title,
      description,
      eventAt,
      slug,
      image: images.length > 0 ? images[0] : undefined,
    });

    await Notification.create({
      userId: user._id,
      title: "News Created",
      message: `Your news titled "${title}" has been created successfully.`,
      type: "success",
      isRead: false,
    });

    return res.status(201).json({
      message: "News created successfully",
      status: "success",
      news,
    });
  } catch (error) {
    console.error("❌ Error in createNews:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "error" });
  }
};

export const updateNews = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const newsId = req.params.id;
    if (!newsId)
      return res
        .status(400)
        .json({ message: "News ID is required", status: "error" });

    const news = await News.findById(newsId);
    if (!news)
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });

    if (news.user.toString() !== userId)
      return res
        .status(403)
        .json({
          message: "Forbidden: You can only update your own news",
          status: "error",
        });

    const { title, description, eventAt } = req.body;
    if (!title || !description || !eventAt)
      return res
        .status(400)
        .json({
          message: "Title, description, and event date are required",
          status: "error",
        });

    // ✅ Ensure unique title (exclude current news)
    const existingNews = await News.findOne({ title, _id: { $ne: newsId } });
    if (existingNews)
      return res
        .status(409)
        .json({
          message: "News with the same title already exists",
          status: "error",
        });

    // ✅ Update slug only if title changed
    let slug = news.slug;
    if (title !== news.title) {
      slug = `${title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")}-${Date.now()}`;
    }

    let images: string[] = [];

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Delete old image if exists
      if (news.image) {
        const publicId = news.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log("✅ Old news image deleted from Cloudinary");
          } catch (err) {
            console.error("❌ Failed to delete old image:", err);
          }
        }
      }

      // Upload new images
      try {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "news",
          });
          images.push(result.secure_url);
        }
      } catch (error) {
        console.error("❌ Failed to upload news images:", error);
        return res
          .status(500)
          .json({ message: "Failed to upload news images", status: "error" });
      }
    }

    // ✅ Update news
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      {
        title,
        description,
        eventAt,
        slug,
        image: images.length > 0 ? images[0] : news.image, // keep old if no new image
      },
      { new: true }
    );

    await Notification.create({
      userId: user._id,
      title: "News Updated",
      message: `Your news titled "${title}" has been updated successfully.`,
      type: "info",
      isRead: false,
    });

    return res
      .status(200)
      .json({
        message: "News updated successfully",
        status: "success",
        news: updatedNews,
      });
  } catch (error) {
    console.error("❌ Error in updateNews:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "error" });
  }
};

export const deleteNews = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: "error" });

    const newsId = req.params.id;
    if (!newsId)
      return res
        .status(400)
        .json({ message: "News ID is required", status: "error" });

    const news = await News.findById(newsId);
    if (!news)
      return res
        .status(404)
        .json({ message: "News not found", status: "error" });

    if (news.user.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden: You can only delete your own news",
        status: "error",
      });
    }

    if (news.image) {
      const publicId = news.image.split("/").pop()?.split(".")[0];
      try {
        await cloudinary.uploader.destroy(`news/${publicId}`);
        console.log(`🗑️ Old news image deleted: ${publicId}`);
      } catch (error) {
        console.log("❌ Filed to delete news image:", error);
        return res
          .status(500)
          .json({ message: "Failed to delete news image", status: "error" });
      }
    }

    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) return res.status(404).json({ message: "News not found" });

    await Notification.create({
      userId: user._id,
      title: "News Deleted",
      message: `Your news titled "${news.title}" has been deleted.`,
      type: "warning",
      isRead: false,
    });
    
    return res
      .status(200)
      .json({ message: "News deleted successfully", status: "success" });
  } catch (error) {
    console.log("❌ Error in deleteNews:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
