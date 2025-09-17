import Joi from "joi";

export const updateAccount = Joi.object({
  name: Joi.string().max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{9,15}$/)
    .optional(),
  image: Joi.string().optional(),

  title: Joi.string().optional(),
  about_me: Joi.string().min(25).max(400).optional(),
});

export const changePassword = Joi.object({
  old_password: Joi.string()
    .required()
    .messages({
      "string.empty": "Old password is required",
    }),

  new_password: Joi.string()
    .min(8)
    .required()
    .custom((value, helpers) => {
      const upperCount = (value.match(/[A-Z]/g) || []).length;
      const lowerCount = (value.match(/[a-z]/g) || []).length;
      const digitCount = (value.match(/\d/g) || []).length;
      const symbolCount = (value.match(/[^A-Za-z0-9]/g) || []).length;

      if (upperCount < 2) {
        return helpers.error("any.custom", { message: "Password must contain at least 2 uppercase letters" });
      }
      if (lowerCount < 2) {
        return helpers.error("any.custom", { message: "Password must contain at least 2 lowercase letters" });
      }
      if (digitCount < 2) {
        return helpers.error("any.custom", { message: "Password must contain at least 2 digits" });
      }
      if (symbolCount < 2) {
        return helpers.error("any.custom", { message: "Password must contain at least 2 special characters" });
      }
      return value;
    })
    .messages({
      "string.empty": "New password is required",
      "string.min": "New password must be at least 8 characters",
      "any.custom": "{{#message}}",
    }),

  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      "any.only": "Confirm password must match new password",
      "string.empty": "Confirm password is required",
    }),
});

