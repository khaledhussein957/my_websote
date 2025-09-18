import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Define request types
interface Credentials {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<{ user: any; token: string }, Credentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Register mutation
    register: builder.mutation<{ user: any; token: string }, Credentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Logout mutation
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // Forgot password mutation
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordData>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset password mutation
    resetPassword: builder.mutation<{ message: string }, ResetPasswordData>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// ✅ Export mutation hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
