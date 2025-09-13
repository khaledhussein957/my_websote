import Joi from "joi";

export const createNewsSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).required(),
    image: Joi.string().optional(),
    eventAt: Joi.date().required(),
});

export const updateNewsSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    image: Joi.string().optional(),
    eventAt: Joi.date().optional(),
});