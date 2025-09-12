import Joi from "joi";

export const registerAccount = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .max(15)
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10-15 digits",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      const upperCount = (value.match(/[A-Z]/g) || []).length;
      const lowerCount = (value.match(/[a-z]/g) || []).length;
      const digitCount = (value.match(/\d/g) || []).length;
      const symbolCount = (value.match(/[^A-Za-z0-9]/g) || []).length;

      if (upperCount < 2) {
        return helpers.error("any.custom", {
          message: "Password must contain at least 2 uppercase letters",
        });
      }
      if (lowerCount < 2) {
        return helpers.error("any.custom", {
          message: "Password must contain at least 2 lowercase letters",
        });
      }
      if (digitCount < 2) {
        return helpers.error("any.custom", {
          message: "Password must contain at least 2 digits",
        });
      }
      if (symbolCount < 2) {
        return helpers.error("any.custom", {
          message: "Password must contain at least 2 special characters",
        });
      }
      return value;
    })
    .messages({
      "string.empty": "New password is required",
      "string.min": "New password must be at least 8 characters",
      "any.custom": "{{#message}}",
    }),
});

export const loginAccount = Joi.object({
  identifier: Joi.alternatives()
    .try(
      Joi.string().email(), // ✅ email
      Joi.string().pattern(/^[0-9]{10,15}$/) // ✅ phone number (10-15 digits)
    )
    .required()
    .messages({
      "alternatives.match": "Identifier must be a valid email or phone number",
    }),
  password: Joi.string().required(),
});
