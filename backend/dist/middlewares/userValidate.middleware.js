import { updateAccount, changePassword } from "../validations/user.validator.ts";
export const validateUpdateUser = (req, res, next) => {
    const { error } = updateAccount.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message });
    }
    next();
};
export const validateChangePassword = (req, res, next) => {
    const { error } = changePassword.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0]?.message });
    }
    next();
};
//# sourceMappingURL=userValidate.middleware.js.map