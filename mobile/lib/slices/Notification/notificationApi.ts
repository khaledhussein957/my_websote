import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Notification type
interface Notification {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface MarkNotificationData {
    id: string;
}

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery,
    tagTypes: ["Notification"],
    endpoints: (builder) => ({
        // Fetch all notifications
        fetchNotifications: builder.query<Notification[], void>({
            query: () => ({
                url: "/notifications",
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),

        // Mark a single notification as read
        markNotificationAsRead: builder.mutation<{ message: string }, MarkNotificationData>({
            query: ({ id }) => ({
                url: `/notifications/${id}/mark-read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),

        // Mark all notifications as read
        markAllNotificationsAsRead: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/notifications/read-all",
                method: "POST",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

// Export hooks
export const {
    useFetchNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
} = notificationApi;
