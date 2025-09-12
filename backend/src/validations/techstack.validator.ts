import Joi from "joi";

export const techStackSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  icon: Joi.string().uri().optional(),
  category: Joi.string().optional(),
  proficiency: Joi.number().integer().min(1).max(10).optional(),
});

export const techStackUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  icon: Joi.string().uri().optional(),
  category: Joi.string().optional(),
  proficiency: Joi.number().integer().min(1).max(10).optional(),
});
