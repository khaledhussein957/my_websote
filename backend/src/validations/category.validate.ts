import Joi from "joi";

export const categoryValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(255).optional().allow(""),
});

export const categoryUpdateValidation = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    description: Joi.string().max(255).optional().allow(""),
});