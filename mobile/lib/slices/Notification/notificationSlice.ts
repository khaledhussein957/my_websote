import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Notification type
interface Notification {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // Fetch
        fetchNotificationsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchNotificationsSuccess(state, action: PayloadAction<Notification[]>) {
            state.loading = false;
            state.notifications = action.payload;
        },
        fetchNotificationsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Mark single as read
        markNotificationAsReadStart(state) {
            state.loading = true;
            state.error = null;
        },
        markNotificationAsReadSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            const index = state.notifications.findIndex((n) => n._id === action.payload);
            if (index !== -1) state.notifications[index].isRead = true;
        },
        markNotificationAsReadFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Mark all as read
        markAllNotificationsAsReadStart(state) {
            state.loading = true;
            state.error = null;
        },
        markAllNotificationsAsReadSuccess(state) {
            state.loading = false;
            state.notifications = state.notifications.map((n) => ({ ...n, isRead: true }));
        },
        markAllNotificationsAsReadFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Common
        clearError(state) {
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,
    markNotificationAsReadStart,
    markNotificationAsReadSuccess,
    markNotificationAsReadFailure,
    markAllNotificationsAsReadStart,
    markAllNotificationsAsReadSuccess,
    markAllNotificationsAsReadFailure,
    clearError,
    setLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer;
