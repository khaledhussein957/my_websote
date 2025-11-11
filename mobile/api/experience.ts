import axiosInstance from "@/lib/axios";

export const experienceApi = {
  addExperience: async (data) => {
    const response = await axiosInstance.post("/experience", data);
    return response.data;
  },

  getExperiences: async () => {
    const response = await axiosInstance.get("/experience");
    return response.data;
  },

  getExperience: async (id) => {
    const response = await axiosInstance.get(`/experience/${id}`);
    return response.data;
  },

  updateExperience: async (id, data) => {
    const response = await axiosInstance.put(`/experience/${id}`, data);
    return response.data;
  },

  deleteExperience: async (id) => {
    const response = await axiosInstance.delete(`/experience/${id}`);
    return response.data;
  },
};