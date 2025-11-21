"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  updateProfile,
  changePassword as updatePassword,
  deleteAccount,
  clearError,
  clearSuccess,
} from "@/lib/slices/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchema } from "@/validations/profile.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Save,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Trash,
} from "lucide-react";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isUpdating, error, success } = useAppSelector((state) => state.user);

  // Profile form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      title: user?.title || "",
      about_me: user?.about_me || "",
      linkedin: user?.linkedin || "",
      github: user?.github || "",
      instagram: user?.instagram || "",
      facebook: user?.facebook || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        title: user.title || "",
        about_me: user.about_me || "",
        linkedin: user?.linkedin || "",
        github: user?.github || "",
        instagram: user?.instagram || "",
        facebook: user?.facebook || "",
      });
    }
  }, [user, reset]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitProfile = (data: ProfileSchema) => {
    dispatch(clearError());
    dispatch(clearSuccess());
    dispatch(updateProfile({ ...data, image: selectedImage || undefined }));
  };

  // Password form setup
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>();

  const onSubmitPassword = (data: PasswordForm) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    dispatch(clearError());
    dispatch(clearSuccess());
    dispatch(
      updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword,
      })
    );
    resetPassword();
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  return (
    <div className="space-y-5">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : user?.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input {...register("email")} />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input {...register("phone")} />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input {...register("location")} />
              {errors.location && (
                <p className="text-xs text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About Me</label>
              <textarea
                {...register("about_me")}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Tell us about yourself..."
              />
              {errors.about_me && (
                <p className="text-xs text-red-500">
                  {errors.about_me.message}
                </p>
              )}
            </div>{" "}
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <Input {...register("linkedin")} />
              {errors.linkedin && (
                <p className="text-xs text-red-500">
                  {errors.linkedin.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <Input {...register("github")} />
              {errors.github && (
                <p className="text-xs text-red-500">{errors.github.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Instagram
              </label>
              <Input {...register("instagram")} />
              {errors.instagram && (
                <p className="text-xs text-red-500">
                  {errors.instagram.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <Input {...register("facebook")} />
              {errors.facebook && (
                <p className="text-xs text-red-500">
                  {errors.facebook.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isUpdating}>
              <Save className="h-4 w-4 mr-2" />
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="space-y-4"
          >
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <Input
                type={showCurrentPassword ? "text" : "password"}
                {...registerPassword("currentPassword", { required: true })}
              />
              <button
                type="button"
                aria-label={
                  showCurrentPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowCurrentPassword((s) => !s)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-500">
                  Current password is required
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                type={showNewPassword ? "text" : "password"}
                {...registerPassword("newPassword", { required: true })}
              />
              <button
                type="button"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                onClick={() => setShowNewPassword((s) => !s)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-500">New password is required</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...registerPassword("confirmNewPassword", { required: true })}
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {passwordErrors.confirmNewPassword && (
                <p className="text-xs text-red-500">
                  Please confirm new password
                </p>
              )}
            </div>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Trash className="h-5 w-5 mr-2" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <CardContent>
              <p className="text-sm mb-2">
                Once you delete your account, all your data will be permanently
                removed. This action cannot be undone.
              </p>

              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
            </CardContent>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and all associated
                  data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Confirm Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
