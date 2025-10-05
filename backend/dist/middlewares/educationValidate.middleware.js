import { addEducation, updateEducation, } from "../validations/education.validator.ts";
export const addEducationValidate = async (req, res, next) => {
    const { error } = addEducation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
export const updateEducationValidate = async (req, res, next) => {
    const { error } = updateEducation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message, status: "error" });
    }
    next();
};
//# sourceMappingURL=educationValidate.middleware.js.map