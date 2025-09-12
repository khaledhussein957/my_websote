import type { Request, Response, NextFunction } from "express";
import { categoryValidation, categoryUpdateValidation } from "../validations/category.validation.ts";

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message });
    }
    next();
};

export const validateCategoryUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryUpdateValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message });
    }
    next();
};