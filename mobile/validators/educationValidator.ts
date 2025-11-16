import { z } from "zod";

const currentYear = new Date().getFullYear();
const yearRegex = /^\d{4}$/;

const yearString = z
  .string()
  .regex(yearRegex, { message: "Year must be a 4-digit year" })
  .refine((val) => {
    const year = parseInt(val, 10);
    return year >= 2010 && year <= currentYear;
  }, { message: `Year must be between 2010 and ${currentYear}` });

const startYearSchema = yearString;

const endYearSchema = z
  .string()
  .regex(yearRegex, { message: "Year must be a 4-digit year" })
  .refine((val) => {
    const year = parseInt(val, 10);
    return year >= 2010 && year <= currentYear;
  }, { message: `Year must be between 2010 and ${currentYear}` });

export const addEducation = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  startYear: startYearSchema,
  endYear: endYearSchema,
  gpa: z.string().optional().or(z.literal("")),
  uri: z.string().url().optional().or(z.literal("")),
}).refine((data) => {
  // endYear cannot be earlier than startYear
  if (data.startYear && data.endYear) {
    return parseInt(data.endYear) >= parseInt(data.startYear);
  }
  return true;
}, {
  message: "End year cannot be earlier than start year",
  path: ["endYear"],
});

export const updateEducation = z.object({
  institution: z.string().min(1).optional(),
  degree: z.string().min(1).optional(),
  startYear: startYearSchema.optional(),
  endYear: endYearSchema.optional(),
  gpa: z.string().optional().or(z.literal("")),
  uri: z.string().url().optional().or(z.literal("")),
}).refine((data) => {
  if (data.startYear && data.endYear) {
    return parseInt(data.endYear) >= parseInt(data.startYear);
  }
  return true;
}, {
  message: "End year cannot be earlier than start year",
  path: ["endYear"],
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});