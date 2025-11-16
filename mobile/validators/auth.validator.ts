import { z } from "zod";

// 🔐 Password Rules (reusable)
const passwordRules = z
  .string()
  .min(8, "New password must be at least 8 characters")
  .refine(
    (value) => (value.match(/[A-Z]/g) || []).length >= 2,
    "Password must contain at least 2 uppercase letters"
  )
  .refine(
    (value) => (value.match(/[a-z]/g) || []).length >= 2,
    "Password must contain at least 2 lowercase letters"
  )
  .refine(
    (value) => (value.match(/\d/g) || []).length >= 2,
    "Password must contain at least 2 digits"
  )
  .refine(
    (value) => (value.match(/[^A-Za-z0-9]/g) || []).length >= 2,
    "Password must contain at least 2 special characters"
  );

// 📌 Register
export const registerAccount = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^[0-9]{9,15}$/, "Phone number must be 10-15 digits")
    .max(15, "Phone number must be at most 15 digits"),

  password: passwordRules,
});

// 📌 Login
export const loginAccount = z.object({
  email: z.string().email("Invalid email").nonempty(),
  password: z.string().nonempty("Password is required"),
});

// 📌 Forgot Password
export const forgotPasswordAccount = z.object({
  email: z.string().email("Invalid email").nonempty(),
});

// 📌 Reset Password
export const resetPasswordAccount = z
  .object({
    code: z.string().nonempty("Code is required"),
    password: passwordRules,
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password does not match",
  });

// 📌 Resend Code
export const resendCode = z.object({
  email: z.string().email("Invalid email").nonempty(),
});