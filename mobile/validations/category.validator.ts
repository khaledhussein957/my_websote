import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export const updateCategorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters").optional(),
    description: z.string().min(5, "Description must be at least 5 characters").optional(),
});

export type CategoryForm = z.infer<typeof createCategorySchema>;
export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;