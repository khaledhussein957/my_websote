import axiosInstance from "@/lib/axios";

export const newsApi = {
  getNews: async () => {
    const response = await axiosInstance.get("/news");
    return response.data;
  },

  getNewsBySlug: async (slug) => {
    const response = await axiosInstance.get(`/news/${slug}`);
    return response.data;
  },

  createNews: async (formData) => {
    const response = await axiosInstance.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateNews: async (id, formData) => {
    const response = await axiosInstance.put(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  },
};