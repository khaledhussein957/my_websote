import type { Request, Response } from "express";

import Testimonial from "../models/testimonial.model.ts";
import User from "../models/user.model.ts";
import Notification from "../models/notification.model.ts";

import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";

import cloudinary from "../config/cloudinary.ts";

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find();
    if (!testimonials)
      return res
        .status(404)
        .json({ message: "No testimonials found", status: "false" });

    res.status(200).json({ data: testimonials, status: "true" });
  } catch (error) {
    console.log("❌ Error fetching testimonials:", error);
    res.status(500).json({ message: "Internal server error", status: "false" });
  }
};

export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, email, message, rating } = req.body; // ✅ fixed typo

    if (!name || !email || !message || !rating)
      return res
        .status(400)
        .json({ message: "All fields are required", status: "false" });

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5", status: "false" });
    }

    // if exists
    const existingTestimonial = await Testimonial.find({ email });
    if (existingTestimonial.length > 0) {
      return res.status(400).json({
        message: "Testimonial with this email already exists",
        status: "false",
      });
    }

    let imageUrl = "";
    if (req.file) {
      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });

      imageUrl = result.secure_url;
    }

    const newTestimonial = new Testimonial({
      name,
      email,
      message, // ✅ fixed typo
      rating,
      image: imageUrl,
    });
    await newTestimonial.save();

    res.status(201).json({ data: newTestimonial, status: "true" });
  } catch (error) {
    console.log("❌ Error adding testimonial:", error);
    res.status(500).json({ message: "Internal server error", status: "false" });
  }
};

export const updateTestimonial = async (
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

    const { testimonialId } = req.params;

    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial)
      return res
        .status(404)
        .json({ message: "Testimonial not found", status: "false" });

    const { name, email, message, rating } = req.body;

    testimonial.name = name || testimonial.name;
    testimonial.email = email || testimonial.email;
    testimonial.message = message || testimonial.message;
    testimonial.rating = rating || testimonial.rating;

    if (req.file) {
      try {
        const publicId = testimonial.image?.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`testimonials/${publicId}`);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "testimonials",
        });
        testimonial.image = result.secure_url;
      } catch (error) {
        console.log("❌ Error uploading new image:", error);
      }
    }

    await testimonial.save();

    await Notification.create({
      userId: user._id,
      title: "Testimonial Updated",
      message: `Your testimonial "${testimonial.name}" has been updated successfully.`,
      type: "info",
      isRead: false,
    });

    res.status(200).json({ data: testimonial, status: "true" });
  } catch (error) {
    console.log("❌ Error updating testimonial:", error);
    res
      .status(500)
      .json({ message: "Failed to update testimonial", status: "false" });
  }
};

export const deleteTestimonial = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: false });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found", status: false });

    const { testimonialId } = req.params;

    // Find and delete testimonial in one step
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      testimonialId
    );
    if (!deletedTestimonial)
      return res
        .status(404)
        .json({ message: "Testimonial not found", status: false });

    // Delete image from Cloudinary
    if (deletedTestimonial.image) {
      try {
        const publicId = deletedTestimonial.image
          .split("/")
          .pop()
          ?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`testimonials/${publicId}`);
        }
      } catch (error) {
        console.log("❌ Error deleting image from Cloudinary:", error);
      }
    }

    await Notification.create({
      userId: user._id,
      title: "Testimonial Deleted",
      message: `Your testimonial "${deletedTestimonial.name}" has been deleted successfully.`,
      type: "info",
      isRead: false,
    });

    res.status(200).json({ message: "Testimonial deleted", status: true });
  } catch (error) {
    console.log("❌ Error deleting testimonial:", error);
    res
      .status(500)
      .json({ message: "Failed to delete testimonial", status: false });
  }
};
