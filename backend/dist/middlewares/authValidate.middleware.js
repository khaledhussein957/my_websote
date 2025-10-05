import {} from "express";
import { registerAccount, loginAccount, forgotPasswordAccount, resetPasswordAccount, } from "../validations/auth.validator.ts";
export const registerAccountValidate = async (req, res, next) => {
    const { error } = registerAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
export const loginAccountValidate = async (req, res, next) => {
    const { error } = loginAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
export const forgotPasswordValidate = async (req, res, next) => {
    const { error } = forgotPasswordAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
export const resetPasswordValidate = async (req, res, next) => {
    const { error } = resetPasswordAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
//# sourceMappingURL=authValidate.middleware.js.map