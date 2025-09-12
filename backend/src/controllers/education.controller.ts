import { type Request, type Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";
import Education from "../models/education.model.ts";

export const getEducation = async (req: Request, res: Response) => {
    try {
        const educations = await Education.find().populate("user", "name email");
        return res.status(200).json({ message: "Educations fetched successfully", status: "success", data: educations });
        
    } catch (error) {
        console.log("❌ Error in getEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const addEducation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const { institution, degree, startYear, endYear, gpa, uri } = req.body;
        if (!institution || !degree || !startYear || !endYear) {
            return res.status(400).json({ message: "Institution and degree are required", status: "error" });
        }

        // check if education already exists for the user
        const existingEducation = await Education.findOne({ user: userId, institution, degree });
        if (existingEducation) return res.status(400).json({ message: "Education already exists", status: "error" });

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
        return res.status(201).json({ message: "Education added successfully", status: "success", data: newEducation });        
    } catch (error) {
        console.log("❌ Error in addEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const updateEducation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const educationId = req.params.id;
        if (!educationId) return res.status(400).json({ message: "Education ID is required", status: "error" });

        const { institution, degree, startYear, endYear, gpa, uri } = req.body;
        if (!institution || !degree || !startYear || !endYear) {
            return res.status(400).json({ message: "Institution and degree are required", status: "error" });
        }

        // check if education exists
        const existingEducation = await Education.findById(educationId);
        if (!existingEducation) return res.status(404).json({ message: "Education not found", status: "error" });

        // check if the education belongs to the user
        if (existingEducation.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden", status: "error" });
        }

        existingEducation.institution = institution || existingEducation.institution;
        existingEducation.degree = degree || existingEducation.degree;
        existingEducation.startYear = startYear || existingEducation.startYear;
        existingEducation.endYear = endYear || existingEducation.endYear;
        existingEducation.gpa = gpa || existingEducation.gpa;
        existingEducation.uri = uri || existingEducation.uri;

        await existingEducation.save();
        return res.status(200).json({ message: "Education updated successfully", status: "success", data: existingEducation });        
    } catch (error) {
        console.log("❌ Error in updateEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};

export const deleteEducation = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "error" });

        const educationId = req.params.id;
        if (!educationId) return res.status(400).json({ message: "Education ID is required", status: "error" });

        // check if education exists
        const existingEducation = await Education.findById(educationId);
        if (!existingEducation) return res.status(404).json({ message: "Education not found", status: "error" });

        // check if the education belongs to the user
        if (existingEducation.user.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden", status: "error" });
        }

        await Education.findByIdAndDelete(educationId);
        return res.status(200).json({ message: "Education deleted successfully", status: "success" });        
    } catch (error) {
        console.log("❌ Error in deleteEducation:", error);
        return res.status(500).json({ message: "Server error", status: "error" });
    }
};
