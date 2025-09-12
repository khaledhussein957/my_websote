import Joi from "joi";

export const addEducation = Joi.object({
    institution: Joi.string().required(),
    degree: Joi.string().required(),
    startYear: Joi.string().required(),
    endYear: Joi.string().required(),
    gpa: Joi.string().optional(),
    uri: Joi.string().uri().optional(),
});

export const updateEducation = Joi.object({
    institution: Joi.string().optional(),
    degree: Joi.string().optional(),
    startYear: Joi.string().optional(),
    endYear: Joi.string().optional(),
    gpa: Joi.string().optional(),
    uri: Joi.string().uri().optional(),
});