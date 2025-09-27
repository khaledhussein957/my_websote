import { z } from "zod";

export const createExperienceSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  description: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  startYear: z
    .string()
    .regex(/^\d{4}$/, "Start year must be a valid 4-digit year"),
  endYear: z.string().regex(/^\d{4}$/, "End year must be a valid 4-digit year"),
  location: z.string().min(2, "Location is required"),
});

export const updateExperienceSchema = z.object({
  title: z.string().min(2, "Job title is required").optional(),
  description: z.string().optional(),
  company: z.string().min(2, "Company name is required").optional(),
  startYear: z
    .string()
    .regex(/^\d{4}$/, "Start year must be a valid 4-digit year")
    .optional(),
  endYear: z
    .string()
    .regex(/^\d{4}$/, "End year must be a valid 4-digit year")
    .optional(),
  location: z.string().min(2, "Location is required").optional(),
});

export type ExperienceFormData = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceFormData = z.infer<typeof updateExperienceSchema>;
