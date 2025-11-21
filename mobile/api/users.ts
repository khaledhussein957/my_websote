import axiosInstance from "@/lib/axios";

export type UpdateAccountData = {
  name?: string;
  email?: string;
  phone?: string;
  title?: string;
  about_me?: string;
  avatar?: File;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export const userApi = {
  updateAccount: async (formData: UpdateAccountData) => {
    const response = await axiosInstance.put(
      "/users/update-account",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await axiosInstance.put("/users/update-password", data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete("/users/delete-account");
    return response.data;
  },
};
