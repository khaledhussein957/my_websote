"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetPassword, clearError, clearResetPasswordSuccess } from "@/lib/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetFormData = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  code: string;
}

export default function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading, error, resetPasswordSuccess } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetFormData) => {
    dispatch(clearError());
    dispatch(clearResetPasswordSuccess());
    await dispatch(resetPassword({ code, password: data.password, confirmPassword: data.confirmPassword }));
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                disabled={isLoading}
                {...register("password")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                disabled={isLoading}
                {...register("confirmPassword")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="text-sm text-red-700 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            </div>
          )}

          {resetPasswordSuccess && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <div className="text-sm text-green-700 dark:text-green-400 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                {resetPasswordSuccess}
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
