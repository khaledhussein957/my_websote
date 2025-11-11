import axiosInstance from "@/lib/axios";

export const authApi = {
  register: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  checkAuth: async () => {
    const response = await axiosInstance.get("/auth/check-auth");
    return response.data;
  },

  forgotPassword: async (data) => {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosInstance.post("/auth/reset-password", data);
    return response.data;
  },

  resendResetCode: async (data) => {
    const response = await axiosInstance.post("/auth/resend-code", data);
    return response.data;
  },
};