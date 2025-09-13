import Joi from "joi";

export const createProjectSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).required(),
    githubUrl: Joi.string().uri().optional(),
    liveDemoUrl: Joi.string().uri().optional(),
    image: Joi.string().optional(),
    techStack: Joi.array().items(Joi.string()).required(),
    featured: Joi.boolean().default(false),
});

export const updateProjectSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    githubUrl: Joi.string().uri().optional(),
    liveDemoUrl: Joi.string().uri().optional(),
    image: Joi.string().optional(),
    techStack: Joi.array().items(Joi.string()).optional(),
    featured: Joi.boolean().default(false),
});