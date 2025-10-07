import Joi from "joi";

const currentYear = new Date().getFullYear();
const yearRegex = /^\d{4}$/;

export const addEducation = Joi.object({
  institution: Joi.string().min(1).required(),
  degree: Joi.string().min(1).required(),
  startYear: Joi.string()
    .pattern(yearRegex)
    .required()
    .custom((value, helpers) => {
      const year = parseInt(value);
      if (year < 2010 || year > currentYear) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Start year validation")
    .messages({
      "string.pattern.base": "Start year must be a 4-digit year",
      "any.invalid": `Start year must be between 2010 and ${currentYear}`,
    }),
  endYear: Joi.string()
    .pattern(yearRegex)
    .required()
    .custom((value, helpers) => {
      const year = parseInt(value);
      const startYear = parseInt(helpers.state.ancestors[0]?.startYear);
      if (year < 2010 || year > currentYear) {
        return helpers.error("any.invalid");
      }
      if (!isNaN(startYear) && year < startYear) {
        return helpers.error("date.lessThanStartYear");
      }
      return value;
    }, "End year validation")
    .messages({
      "string.pattern.base": "End year must be a 4-digit year",
      "any.invalid": `End year must be between 2010 and ${currentYear}`,
      "date.lessThanStartYear": "End year cannot be earlier than start year",
    }),
  gpa: Joi.string().allow("").optional(),
  uri: Joi.string().uri().allow("").optional(),
});

export const updateEducation = Joi.object({
  institution: Joi.string().min(1).optional(),
  degree: Joi.string().min(1).optional(),
  startYear: Joi.string()
    .pattern(yearRegex)
    .custom((value, helpers) => {
      const year = parseInt(value);
      if (year < 2010 || year > currentYear) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Start year validation")
    .messages({
      "string.pattern.base": "Start year must be a 4-digit year",
      "any.invalid": `Start year must be between 2010 and ${currentYear}`,
    })
    .optional(),
  endYear: Joi.string()
    .pattern(yearRegex)
    .custom((value, helpers) => {
      const year = parseInt(value);
      const startYear = parseInt(helpers.state.ancestors[0]?.startYear);
      if (year < 2010 || year > currentYear) {
        return helpers.error("any.invalid");
      }
      if (!isNaN(startYear) && year < startYear) {
        return helpers.error("date.lessThanStartYear");
      }
      return value;
    }, "End year validation")
    .messages({
      "string.pattern.base": "End year must be a 4-digit year",
      "any.invalid": `End year must be between 2010 and ${currentYear}`,
      "date.lessThanStartYear": "End year cannot be earlier than start year",
    })
    .optional(),
  gpa: Joi.string().allow("").optional(),
  uri: Joi.string().uri().allow("").optional(),
}).min(1); // at least one field required for update
