import axiosInstance from "@/lib/axios";

export const userApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  updateAccount: async (formData) => {
    const response = await axiosInstance.put("/users/update-account", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axiosInstance.put("/users/update-password", data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete("/users/delete-account");
    return response.data;
  },
};