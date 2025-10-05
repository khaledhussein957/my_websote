import type { Request, Response, NextFunction } from "express";
import { createProjectSchema, updateProjectSchema } from "../validations/project.validator";

export const createProjectValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = createProjectSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message, status: "error" });
    }
    next();
};

export const updateProjectValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateProjectSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message, status: "error" });
    }
    next();
};