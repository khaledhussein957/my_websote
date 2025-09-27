"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { forgotPassword, clearError, clearForgotPasswordSuccess } from "@/lib/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const forgotSchema = z.object({
  email: z.string().email("Valid email required"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error, forgotPasswordSuccess } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormData) => {
    dispatch(clearError());
    dispatch(clearForgotPasswordSuccess());
    await dispatch(forgotPassword(data.email));
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                disabled={isLoading}
                {...register("email")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
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

          {forgotPasswordSuccess && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <div className="text-sm text-green-700 dark:text-green-400 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                {forgotPasswordSuccess}
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
