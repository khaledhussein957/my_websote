import axiosInstance from "@/lib/axios";

export interface NewsData {
  id: string;
  title: string;
  description: string;
  image?: string;
  slug: string;
  eventAt: string;

  createdAt: string;
  updatedAt: string;
}

export const newsApi = {
  getNews: async (): Promise<NewsData[]> => {
    const response = await axiosInstance.get("/news");
    return response.data;
  },

  getNewsBySlug: async (slug: string): Promise<NewsData> => {
    const response = await axiosInstance.get(`/news/${slug}`);
    return response.data;
  },

  createNews: async (formData: NewsData): Promise<NewsData> => {
    const response = await axiosInstance.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateNews: async (id: string, formData: NewsData): Promise<NewsData> => {
    const response = await axiosInstance.put(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteNews: async (id: string): Promise<NewsData> => {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  },
};
