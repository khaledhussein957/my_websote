import {} from "express";
import Education from "../models/education.model.ts";
import Notification from "../models/notification.model.ts";
import User from "../models/user.model.ts";
export const getEducations = async (req, res) => {
    try {
        const educations = await Education.find().populate("user", "name email");
        if (!educations)
            return res
                .status(404)
                .json({ message: "No educations found", status: "false" });
        return res
            .status(200)
            .json({
            message: "Educations fetched successfully",
            status: "true",
            data: educations,
        });
    }
    catch (error) {
        console.log("❌ Error in getEducation:", error);
        return res.status(500).json({ message: "Server error", status: "false" });
    }
};
export const getEducation = async (req, res) => {
    try {
        const educationId = req.params.id;
        if (!educationId)
            return res
                .status(400)
                .json({ message: "Education ID is required", status: "false" });
        const education = await Education.findById(educationId).populate("user", "name email");
        if (!education)
            return res
                .status(404)
                .json({ message: "Education not found", status: "false" });
        return res
            .status(200)
            .json({
            message: "Education fetched successfully",
            status: "true",
            data: education,
        });
    }
    catch (error) {
        console.log("❌ Error in getEducation:", error);
        return res.status(500).json({ message: "Server error", status: "false" });
    }
};
export const addEducation = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const user = await User.findById(userId).select("-password");
        if (!user)
            return res
                .status(404)
                .json({ message: "User not found", status: "error" });
        const { institution, degree, startYear, endYear, gpa, uri } = req.body;
        if (!institution || !degree || !startYear || !endYear) {
            return res
                .status(400)
                .json({
                message: "Institution and degree are required",
                status: "error",
            });
        }
        // check if education already exists for the user
        const existingEducation = await Education.findOne({
            user: userId,
            institution,
            degree,
        });
        if (existingEducation)
            return res
                .status(400)
                .json({ message: "Education already exists", status: "error" });
        const newEducation = new Education({
            user: userId,
            institution,
            degree,
            startYear,
            endYear,
            gpa,
            uri,
        });
        await newEducation.save();
        await Notification.create({
            userId: userId,
            title: "New Education Added",
            message: `You have added a new education: ${degree} at ${institution}.`,
            type: "success",
            isRead: false,
        });
        return res
            .status(201)
            .json({
            message: "Education added successfully",
            status: "success",
            data: newEducation,
        });
    }
    catch (error) {
        console.log("❌ Error in addEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};
export const updateEducation = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const educationId = req.params.id;
        if (!educationId)
            return res
                .status(400)
                .json({ message: "Education ID is required", status: "error" });
        const { institution, degree, startYear, endYear, gpa, uri } = req.body;
        if (!institution || !degree || !startYear || !endYear) {
            return res
                .status(400)
                .json({
                message: "Institution and degree are required",
                status: "error",
            });
        }
        // check if education exists
        const existingEducation = await Education.findById(educationId);
        if (!existingEducation)
            return res
                .status(404)
                .json({ message: "Education not found", status: "error" });
        // check if the education belongs to the user
        if (existingEducation.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden", status: "error" });
        }
        existingEducation.institution =
            institution || existingEducation.institution;
        existingEducation.degree = degree || existingEducation.degree;
        existingEducation.startYear = startYear || existingEducation.startYear;
        existingEducation.endYear = endYear || existingEducation.endYear;
        existingEducation.gpa = gpa || existingEducation.gpa;
        existingEducation.uri = uri || existingEducation.uri;
        await existingEducation.save();
        await Notification.create({
            userId: userId,
            title: "Education Updated",
            message: `You have updated your education: ${degree} at ${institution}.`,
            type: "info",
            isRead: false,
        });
        return res
            .status(200)
            .json({
            message: "Education updated successfully",
            status: "success",
            data: existingEducation,
        });
    }
    catch (error) {
        console.log("❌ Error in updateEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};
export const deleteEducation = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const educationId = req.params.id;
        if (!educationId)
            return res
                .status(400)
                .json({ message: "Education ID is required", status: "error" });
        // check if education exists
        const existingEducation = await Education.findById(educationId);
        if (!existingEducation)
            return res
                .status(404)
                .json({ message: "Education not found", status: "error" });
        // check if the education belongs to the user
        if (existingEducation.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden", status: "error" });
        }
        const deletedEducation = await Education.findByIdAndDelete(educationId);
        if (!deletedEducation)
            return res
                .status(404)
                .json({ message: "Education not found", status: "error" });
        await Notification.create({
            userId: userId,
            title: "Education Deleted",
            message: `You have deleted your education: ${existingEducation.degree} at ${existingEducation.institution}.`,
            type: "warning",
            isRead: false,
        });
        return res
            .status(200)
            .json({ message: "Education deleted successfully", status: "success" });
    }
    catch (error) {
        console.log("❌ Error in deleteEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};
//# sourceMappingURL=education.controller.js.map