import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  items: Notification[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: NotificationState = {
  items: [],
  isLoading: false,
  error: null,
  success: null,
};

// Thunks
export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notifications");
      return res.data.data as Notification[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch notifications");
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markRead",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/notifications/${id}/mark-read`);
      return res.data.data as Notification;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to mark notification as read");
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.patch("/notifications/mark-all-read");
      return res.data.data as Notification[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to mark all notifications as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationError(state) {
      state.error = null;
    },
    clearNotificationSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // mark single read
      .addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.items = state.items.map((n) =>
          n._id === action.payload._id ? action.payload : n
        );
        state.success = "Notification marked as read";
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // mark all read
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.items = action.payload;
        state.success = "All notifications marked as read";
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearNotificationError, clearNotificationSuccess } = notificationSlice.actions;
export default notificationSlice.reducer;
