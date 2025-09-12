import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.ts";

import { validatePhoneNumber } from "../utils/phoneValidate.ts";

import ENV from "../config/ENV.ts";

import { type AuthenticatedRequest } from "../middlewares/protectRoute.ts";

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

    return res
      .status(201)
      .json({
        message: "User created successfully",
        status: "success",
        newUser,
        token,
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

    return res
      .status(200)
      .json({ message: "Login successful", status: "success", user, token });
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
