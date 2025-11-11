import axiosInstance from "@/lib/axios";

export const notificationApi = {
  getNotifications: async () => {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  },

  markAllRead: async () => {
    const response = await axiosInstance.patch("/notifications/mark-all-read");
    return response.data;
  },

  markRead: async (notificationId) => {
    const response = await axiosInstance.patch(
      `/notifications/${notificationId}/mark-read`
    );
    return response.data;
  },
};