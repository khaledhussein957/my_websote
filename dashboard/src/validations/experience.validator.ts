import { z } from "zod";

const currentYear = new Date().getFullYear();
const yearRegex = /^\d{4}$/;

export const createExperienceSchema = z
  .object({
    title: z.string().min(2).max(100),
    company: z.string().min(2).max(100),
    location: z.string().min(2).max(100),
    startYear: z
      .string()
      .regex(yearRegex, "Start year must be a 4-digit number")
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
      .refine(
        (val) => {
          if (!val || val === "Present") return true;
          if (!yearRegex.test(val)) return false;
          const num = parseInt(val);
          return num >= 2010 && num <= currentYear;
        },
        {
          message: `End year must be a 4-digit year between 1900 and ${currentYear}, or "Present"`,
        }
      ),
    description: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.startYear &&
      data.endYear &&
      data.endYear !== "Present" &&
      yearRegex.test(data.startYear) &&
      yearRegex.test(data.endYear)
    ) {
      const start = parseInt(data.startYear);
      const end = parseInt(data.endYear);
      if (end < start) {
        ctx.addIssue({
          code: "custom",
          path: ["endYear"],
          message: "End year cannot be earlier than start year",
        });
      }
    }
  });

export const updateExperienceSchema = createExperienceSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
