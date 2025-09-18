import Joi from "joi";

export const createTestimonialSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  image: Joi.string().uri().optional(),
  message: Joi.string().max(500).required(), // ✅ fixed typo
  rating: Joi.number().min(1).max(5).required(),
});

export const updateTestimonialSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  image: Joi.string().uri().optional(),
  message: Joi.string().max(500).optional(), // ✅ fixed typo
  rating: Joi.number().min(1).max(5).optional(),
}).min(1);
