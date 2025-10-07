import { z } from "zod";

const yearRegex = /^\d{4}$/;
const currentYear = new Date().getFullYear();

export const addEducationSchema = z
  .object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    startYear: z
      .string()
      .regex(yearRegex, { message: "Must be a 4-digit year" })
      .refine(
        (val) => {
          const num = parseInt(val);
          return num >= 2010 && num <= currentYear;
        },
        {
          message: `Start year must be between 1900 and ${currentYear}`,
        }
      ),
    endYear: z
      .string()
      .regex(yearRegex, { message: "Must be a 4-digit year" })
      .refine(
        (val) => {
          const num = parseInt(val);
          return num >= 2010 && num <= currentYear;
        },
        {
          message: `End year must be between 1900 and ${currentYear}`,
        }
      ),
    gpa: z.string().optional().or(z.literal("")),
    uri: z.string().url().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const start = parseInt(data.startYear);
    const end = parseInt(data.endYear);

    if (!isNaN(start) && !isNaN(end) && end < start) {
      ctx.addIssue({
        code: "custom",
        path: ["endYear"],
        message: "End year cannot be earlier than start year",
      });
    }
  });

export const updateEducationSchema = addEducationSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
