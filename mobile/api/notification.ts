import axiosInstance from "@/lib/axios";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
}

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  },

  markAllRead: async (): Promise<Notification[]> => {
    const response = await axiosInstance.patch("/notifications/mark-all-read");
    return response.data;
  },

  markRead: async (notificationId: string): Promise<Notification> => {
    const response = await axiosInstance.patch(
      `/notifications/${notificationId}/mark-read`
    );
    return response.data;
  },
};
