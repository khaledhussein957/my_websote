import Joi from 'joi';

export const createExperienceSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    company: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
    startYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    endYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    description: Joi.string().max(1000).optional(),
});

export const updateExperienceSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    company: Joi.string().min(2).max(100).optional(),
    location: Joi.string().min(2).max(100).optional(),
    startYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    endYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    description: Joi.string().max(1000).optional(),
}).min(1); // At least one field must be provided for update