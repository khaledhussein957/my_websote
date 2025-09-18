import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Request types
interface UpdateProfileData {
    name?: string;
    email?: string;
    avatar?: string;
}

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        // Update profile
        updateProfile: builder.mutation<{ user: any; message: string }, UpdateProfileData>({
            query: (data) => ({
                url: "/user/update-profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        // Change password
        changePassword: builder.mutation<{ message: string }, ChangePasswordData>({
            query: (data) => ({
                url: "/user/change-password",
                method: "PUT",
                body: data,
            }),
        }),

        // Delete account
        deleteAccount: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/user/delete-account",
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

// Export hooks
export const {
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
} = userApi;
