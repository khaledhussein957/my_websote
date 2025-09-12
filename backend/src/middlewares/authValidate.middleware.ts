import { type NextFunction, type Request, type Response } from "express";
import { registerAccount, loginAccount } from "../validations/auth.validator.ts";

export const registerAccountValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
}

export const loginAccountValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
}
