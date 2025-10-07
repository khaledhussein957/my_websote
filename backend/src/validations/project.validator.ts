import Joi from "joi";

const projectTypeEnum = ["mobile", "fullstack", "frontend", "backend", "machine"] as const;

export const createProjectSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).required(),
    githubUrl: Joi.string().uri().optional(),
    type: Joi.string().valid(...projectTypeEnum).required(),
    liveDemoUrl: Joi.string().uri().optional(),
    image: Joi.string().optional(),
    techStack: Joi.array().items(Joi.string()).optional(),
    featured: Joi.boolean().default(false),
});

export const updateProjectSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    githubUrl: Joi.string().uri().optional(),
    type: Joi.string().valid(...projectTypeEnum).optional(),
    liveDemoUrl: Joi.string().uri().optional(),
    image: Joi.string().optional(),
    techStack: Joi.array().items(Joi.string()).optional(),
    featured: Joi.boolean().default(false),
});