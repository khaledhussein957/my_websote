import Joi from "joi";
export const addEducation = Joi.object({
    institution: Joi.string().required(),
    degree: Joi.string().required(),
    startYear: Joi.string().required(),
    endYear: Joi.string().required(),
    gpa: Joi.string().allow("").optional(), // ✅ allow empty string
    uri: Joi.string().uri().allow("").optional(),
});
export const updateEducation = Joi.object({
    institution: Joi.string().optional(),
    degree: Joi.string().optional(),
    startYear: Joi.string().optional(),
    endYear: Joi.string().optional(),
    gpa: Joi.string().allow("").optional(), // ✅ allow empty string
    uri: Joi.string().uri().allow("").optional(),
});
//# sourceMappingURL=education.validator.js.map