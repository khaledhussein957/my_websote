import Joi from "joi";

const currentYear = new Date().getFullYear();

const yearString = Joi.string()
  .pattern(/^\d{4}$/, "4-digit year")
  .custom((value, helpers) => {
    const num = parseInt(value, 10);
    if (num < 1900 || num > currentYear) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Year range validation");

const endYearString = Joi.string().custom((value, helpers) => {
  if (value === "Present") return value;

  if (!/^\d{4}$/.test(value)) {
    return helpers.error("string.pattern.base", { name: "4-digit year" });
  }

  const num = parseInt(value, 10);
  if (num < 1900 || num > currentYear) {
    return helpers.error("any.invalid");
  }

  return value;
}, "End year validation");

const baseExperienceSchema = {
  title: Joi.string().min(2).max(100),
  company: Joi.string().min(2).max(100),
  location: Joi.string().min(2).max(100),
  startYear: yearString,
  endYear: endYearString,
  description: Joi.string().max(1000),
};

// ✅ Create Experience Schema
export const createExperienceSchema = Joi.object({
  ...baseExperienceSchema,
  title: baseExperienceSchema.title.required(),
  company: baseExperienceSchema.company.required(),
  location: baseExperienceSchema.location.required(),
  startYear: baseExperienceSchema.startYear.required(),
})
  .custom((value, helpers) => {
    const { startYear, endYear } = value;

    if (startYear && endYear && endYear !== "Present") {
      const start = parseInt(startYear, 10);
      const end = parseInt(endYear, 10);

      if (end < start) {
        return helpers.error("custom.lessThanStartYear");
      }
    }

    return value;
  }, "Cross-year validation")
  .messages({
    "custom.lessThanStartYear": "End year cannot be earlier than start year",
  });

// ✅ Update Experience Schema
export const updateExperienceSchema = Joi.object(baseExperienceSchema)
  .min(1)
  .custom((value, helpers) => {
    const { startYear, endYear } = value;

    if (startYear && endYear && endYear !== "Present") {
      const start = parseInt(startYear, 10);
      const end = parseInt(endYear, 10);

      if (end < start) {
        return helpers.error("custom.lessThanStartYear");
      }
    }

    return value;
  }, "Cross-year validation")
  .messages({
    "custom.lessThanStartYear": "End year cannot be earlier than start year",
  });
