import axiosInstance from "@/lib/axios";

export type CategoryData = {
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const categoryApi = {
  getCategories: async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  },

  addCategory: async (data: CategoryData) => {
    const response = await axiosInstance.post("/categories", data);
    return response.data;
  },

  updateCategory: async (id: string, data: CategoryData) => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },
};
