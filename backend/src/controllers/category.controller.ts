import { type Request, type Response } from "express";

import type { AuthenticatedRequest } from "../middlewares/protectRoute";

import Category from "../models/category.model";
import Notification from "../models/notification.model";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ message: "Categories fetched successfully", status: "success", data: categories });
    }
    catch (error) {
        console.log("❌ Error in getCategories:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const addCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const { name, description } = req.body;
        if (!name || !description) return res.status(400).json({ message: "Category name is required", status: "error" });

        // check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) return res.status(400).json({ message: "Category already exists", status: "error" });

        const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""); // generate slug from name like this-is-category-name

        const newCategory = new Category({
            user: userId,
            name,
            slug,
            description,
        });

        const savedCategory = await newCategory.save();

        await Notification.create({
            userId: userId,
            title: "New Category Added",
            message: `Category "${name}" has been added successfully.`,
            type: "success",
            isRead: false,
        });

        return res.status(201).json({ message: "Category added successfully", status: "success", data: savedCategory });
        
    } catch (error) {
        console.log("❌ Error in addCategory:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const updateCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const categoryId = req.params.id;
        if (!categoryId) return res.status(400).json({ message: "Category ID is required", status: "error" });

        const { name, description } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found", status: "error" });

        // Only the user who created the category can update it
        if (category.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You don't have permission to update this category", status: "error" });
        }

        if (name) {
            category.name = name || category.name;
            category.slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || category.slug; // update slug if name is updated
        }

        if (description) {
            category.description = description || category.description;
        }

        const updatedCategory = await category.save();

        await Notification.create({
            userId: userId,
            title: "Category Updated",
            message: `Category "${category.name}" has been updated successfully.`,
            type: "info",
            isRead: false,
        });

        return res.status(200).json({ message: "Category updated successfully", status: "success", data: updatedCategory });
        
    } catch (error) {
        console.log("❌ Error in updateCategory:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const deleteCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const categoryId = req.params.id;
        if (!categoryId) return res.status(400).json({ message: "Category ID is required", status: "error" });

        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found", status: "error" });

        // Only the user who created the category can delete it
        if (category.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden: You don't have permission to delete this category", status: "error" });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) return res.status(500).json({ message: "Failed to delete category", status: "error" });

        await Notification.create({
            userId: userId,
            title: "Category Deleted",
            message: `Category "${category.name}" has been deleted successfully.`,
            type: "warning",
            isRead: false,
        });

        return res.status(200).json({ message: "Category deleted successfully", status: "success" });        
    } catch (error) {
        console.log("❌ Error in deleteCategory:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};