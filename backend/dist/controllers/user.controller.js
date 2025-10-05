import {} from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.ts";
import Notification from "../models/notification.model.ts";
// import uploadImages from "../utils/s3Uploader.ts";
import { validatePhoneNumber } from "../utils/phoneValidate.ts";
// import ENV from "../config/ENV.ts";
import cloudinary from "../config/cloudinary.ts";
// import s3 from "../config/Aws.ts";
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0)
            return res.status(404).json({ message: "No users found", status: "error" });
        return res.status(200).json({
            message: "Users fetched successfully",
            status: "success",
            data: users,
        });
    }
    catch (error) {
        console.log("❌ Error in getUsers: ", error);
        return res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
    }
};
export const getUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found", status: "error" });
        return res.status(200).json({
            message: "User fetched successfully",
            status: "success",
            data: user,
        });
    }
    catch (error) {
        console.log("❌ Error in getUser: ", error);
        return res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
    }
};
export const updateAccount = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const { name, email, phone, title, about_me } = req.body;
        // ✅ Validate phone format first
        if (phone) {
            const phoneValidation = validatePhoneNumber(phone);
            if (!phoneValidation?.valid) {
                return res.status(400).json({
                    message: phoneValidation?.message,
                    status: "error",
                });
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", status: "error" });
        }
        // ✅ Check for duplicate phone (excluding current user)
        if (phone) {
            const phoneExists = await User.findOne({ phone, _id: { $ne: userId } });
            if (phoneExists) {
                return res
                    .status(400)
                    .json({ message: "Phone number already in use", status: "error" });
            }
        }
        // ✅ Check for duplicate email (excluding current user)
        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res
                    .status(400)
                    .json({ message: "Email already in use", status: "error" });
            }
        }
        // ✅ Upload profile picture if file exists
        if (req.file) {
            // for aws
            // // Check if user has an old image
            // if (user.imageKey) {
            //   try {
            //     await s3
            //       .deleteObject({
            //         Bucket: ENV.AWS_S3_BUCKET_NAME,
            //         Key: user.imageKey,
            //       })
            //       .promise();
            //     console.log(`🗑️ Old profile image deleted: ${user.imageKey}`);
            //   } catch (err) {
            //     console.error("❌ Failed to delete old profile image:", err);
            //     return res.status(500).json({
            //       message: "Failed to remove old profile image. Upload aborted.",
            //       status: "error",
            //     });
            //   }
            // }
            // // Upload the new image
            // try {
            //   const uploadedImages = await uploadImages(req.file, "profile");
            //   user.image = uploadedImages[0]?.Location || "";
            //   user.imageKey = uploadedImages[0]?.Key || ""; // store key in DB for future deletion
            // } catch (uploadErr) {
            //   console.error("❌ Failed to upload new profile image:", uploadErr);
            //   return res.status(500).json({
            //     message: "Failed to upload new profile image.",
            //     status: "error",
            //   });
            // }
            // for cloudinary
            // Destroy previous image if exists
            if (user.image) {
                // Delete old image from Cloudinary
                const publicId = user.image.split("/").pop()?.split(".")[0];
                try {
                    if (publicId) {
                        await cloudinary.uploader.destroy(`profile-pictures/${publicId}`);
                        console.log(`🗑️ Old profile image deleted: ${publicId}`);
                    }
                }
                catch (error) {
                    console.error("❌ Failed to delete old profile image:", error);
                }
            }
            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "profile-pictures",
            });
            user.image = result.secure_url;
        }
        // ✅ Update user fields
        if (name)
            user.name = name || user.name;
        if (email)
            user.email = email || user.email;
        if (phone)
            user.phone = phone || user.phone;
        if (title)
            user.title = title || user.title;
        if (about_me)
            user.about_me = about_me || user.about_me;
        await user.save();
        await Notification.create({
            userId: user._id,
            title: "Account Updated",
            message: "Your account details have been updated successfully.",
            type: "success",
            isRead: false,
        });
        return res.status(200).json({
            message: "Account updated successfully",
            status: "success",
            data: user,
        });
    }
    catch (error) {
        console.log("❌ Error in updateAccount: ", error);
        return res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
    }
};
export const changePassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        const user = await User.findById(userId);
        if (!user)
            return res
                .status(404)
                .json({ message: "user not found", status: "error" });
        const { oldPassword, newPassword, comfirmPassword } = req.body;
        if (!oldPassword || !newPassword || !comfirmPassword)
            return res
                .status(400)
                .json({ message: "All field are required", status: "error" });
        const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
        if (!isPasswordValid)
            return res
                .status(400)
                .json({ message: "Invalid credentials", status: "error" });
        if (newPassword.length < 8)
            return res.status(400).json({
                message: "New password must be at least 8 characters long",
                status: "error",
            });
        if (newPassword !== comfirmPassword)
            return res
                .status(400)
                .json({ message: "Password not match", status: "error" });
        // hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        await Notification.create({
            userId: user._id,
            title: "Password Changed",
            message: "Your account password has been changed successfully.",
            type: "success",
            isRead: false,
        });
        return res.status(200).json({
            message: "Password changed successfully",
            status: "success",
        });
    }
    catch (error) {
        console.log("❌ Error in changePassword: ", error);
        return res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
    }
};
export const deleteAccount = async (req, res) => {
    const userID = req.user?.id;
    try {
        const user = await User.findByIdAndDelete(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // for aws
        // if (user.imageKey) {
        //   try {
        //     await s3
        //       .deleteObject({
        //         Bucket: ENV.AWS_S3_BUCKET_NAME,
        //         Key: user.imageKey,
        //       })
        //       .promise();
        //     console.log(`🗑️ Old profile image deleted: ${user.imageKey}`);
        //   } catch (err) {
        //     console.error("❌ Failed to delete old profile image:", err);
        //     return res.status(500).json({
        //       message: "Failed to remove old profile image. Upload aborted.",
        //       status: "error",
        //     });
        //   }
        // }
        // for cloudinary
        if (user.image) {
            // Delete old image from Cloudinary
            const publicId = user.image.split("/").pop()?.split(".")[0];
            try {
                if (publicId) {
                    await cloudinary.uploader.destroy(`profile-pictures/${publicId}`);
                    console.log(`🗑️ Old profile image deleted: ${publicId}`);
                }
            }
            catch (error) {
                console.error("❌ Failed to delete old profile image:", error);
            }
        }
        return res
            .status(200)
            .json({ message: "Account deleted successfully", status: "success" });
    }
    catch (error) {
        console.log("❌ Error in deleteAccount: ", error);
        return res
            .status(500)
            .json({ message: "Internal server error", status: "error" });
    }
};
//# sourceMappingURL=user.controller.js.map