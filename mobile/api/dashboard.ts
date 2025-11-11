import axiosInstance from "@/lib/axios";

export const dashboardApi = {
  DashboardStats: async () => {
    const response = await axiosInstance.get(`/dashboard/stats`);
    return response.data;
  },
};
