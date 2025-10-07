import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  id: string;
  title: string;
  body?: string;
  isRead: boolean;
  createdAt?: string;
};

type NotificationsState = {
  items: Notification[];
};

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload;
    },
    markRead: (state, action: PayloadAction<string>) => {
      const n = state.items.find(i => i.id === action.payload);
      if (n) n.isRead = true;
    },
    markAllRead: (state) => {
      state.items.forEach(i => { i.isRead = true; });
    },
  },
});

export const { setNotifications, markRead, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
