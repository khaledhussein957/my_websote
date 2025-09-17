import { z } from "zod";

export const createEducationSchema = z.object({
  institution: z
    .string()
    .min(2, "Institution must be at least 2 characters")
    .max(100, "Institution cannot exceed 100 characters"),
  degree: z
    .string()
    .min(1, "Degree cannot be empty")
    .max(100, "Degree cannot exceed 100 characters"),
  startYear: z
    .string()
    .regex(/^\d{4}$/, "startYear must be a 4-digit year")
    .optional()
    .or(z.literal("")),
  endYear: z
    .string()
    .regex(/^\d{4}$|^present$/i, "endYear must be a 4-digit year or 'Present'")
    .optional()
    .or(z.literal("")),
  gpa: z
    .string()
    .regex(/^(\d+(\.\d+)?)$/, "gpa must be a number like 3.5")
    .optional()
    .or(z.literal("")),
  uri: z.string().url("uri must be a valid URL").optional().or(z.literal("")),
});

export const updateEducationSchema = z.object({
  institution: z
    .string()
    .min(2, "Institution must be at least 2 characters")
    .max(100, "Institution cannot exceed 100 characters")
    .optional(),
  degree: z
    .string()
    .min(1, "Degree cannot be empty")
    .max(100, "Degree cannot exceed 100 characters")
    .optional(),
  startYear: z
    .string()
    .regex(/^\d{4}$/, "startYear must be a 4-digit year")
    .optional()
    .or(z.literal("")),
  endYear: z
    .string()
    .regex(/^\d{4}$|^present$/i, "endYear must be a 4-digit year or 'Present'")
    .optional()
    .or(z.literal("")),
  gpa: z
    .string()
    .regex(/^(\d+(\.\d+)?)$/, "gpa must be a number like 3.5")
    .optional()
    .or(z.literal("")),
  uri: z.string().url("uri must be a valid URL").optional().or(z.literal("")),
});

export type CreateEducationSchema = z.infer<typeof createEducationSchema>;

export type UpdateEducationSchema = z.infer<typeof updateEducationSchema>;