import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.ts";
import Notification from "../models/notification.model.ts";

import { validatePhoneNumber } from "../utils/phoneValidate.ts";

import ENV from "../config/ENV.ts";

import { type AuthenticatedRequest } from "../middlewares/protectRoute.ts";

import {
  forgotPasswordEmail,
  sendPasswordResetSuccessEmail,
} from "../emails/emailHandlers.ts";

export const registerAccount = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", status: "error" });

    const phoneValidation = validatePhoneNumber(phone);
    if (!phoneValidation?.valid)
      return res
        .status(400)
        .json({ message: phoneValidation?.message, status: "error" });

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists", status: "error" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, ENV.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production", // false for local dev
      sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 3600000,
    });

    return res.status(201).json({
      message: "User created successfully",
      status: "success",
      newUser,
    });
  } catch (error) {
    console.log("❌ Error in registerAccount: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const loginAccount = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", status: "error" });

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", status: "error" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Invalid password", status: "error" });

    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production", // false for local dev
      sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json({ message: "Login successful", status: "success", user });
  } catch (error) {
    console.log("❌ Error in loginAccount: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const checkAuth = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", status: "error" });
    }

    res.status(200).json({ message: "User found", status: "success", user });
  } catch (error) {
    console.log("❌ Error in checkAuth: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ message: "Logged out successfully", status: "success" });
  } catch (error) {
    console.log("❌ Error in logout: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ message: "All field are required", status: "false" });

    const user = await User.findOne({ email }).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ message: "Useer not found", status: "false" });

    // Generate reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    user.resetPasswordCode = resetCode;
    user.resetPasswordExpiresAt = resetCodeExpiresAt;

    await user.save();

    await Notification.create({
      userId: user._id,
      title: "Password Reset Requested",
      message: `A password reset was requested for your account. Use the code ${resetCode} to reset your password. This code will expire in 5 minutes.`,
      type: "info",
      isRead: false,
    });

    // TODO: send email to successfully snet reset code for password
    try {
      await forgotPasswordEmail(
        user.name,
        resetCode,
        ENV.CLIENT_URL as string,
        user.email
      );
      res
        .status(200)
        .json({ message: "Reset code sent to email", status: "true" });
    } catch (error) {
      console.log("❌ Error sending forgot password email: ", error);
    }
  } catch (error) {
    console.log("❌ Error in forgot password: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword, code } = req.body;
    if (!password || !confirmPassword || !code)
      return res
        .status(400)
        .json({ message: "All field are required", status: "false" });

    if (password === confirmPassword)
      return res
        .status(400)
        .json({
          message: "Password and confirm password not matched",
          status: "false",
        });

    const user = await User.findOne({
      resetPasswordCode: code,
      resetPasswordExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset code", status: false });
    }

    // check if password is same with old password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid)
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
        status: false,
      });

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordCode = undefined as unknown as string;
    user.resetPasswordExpiresAt = undefined as unknown as Date;

    await user.save();

    await Notification.create({
      userId: user._id,
      title: "Password Reset Successful",
      message: `Your password has been successfully reset.`,
      type: "success",
      isRead: false,
    });

    res
      .status(200)
      .json({ message: "Password reset successful", status: true });

    try {
      await sendPasswordResetSuccessEmail(user.email);
      res
        .status(200)
        .json({ message: "Password reset successful", status: true });
    } catch (error) {
      console.log("❌ Error sending password reset success email: ", error);
    }
  } catch (error) {
    console.log("❌ Error in reset password: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
