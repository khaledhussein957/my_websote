import axiosInstance from "@/lib/axios";

export const educationApi = {
  getEducations: async () => {
    const response = await axiosInstance.get("/education");
    return response.data;
  },

  getEducation: async (id) => {
    const response = await axiosInstance.get(`/education/${id}`);
    return response.data;
  },

  addEducation: async (data) => {
    const response = await axiosInstance.post("/education", data);
    return response.data;
  },

  updateEducation: async (id, data) => {
    const response = await axiosInstance.put(`/education/${id}`, data);
    return response.data;
  },

  deleteEducation: async (id) => {
    const response = await axiosInstance.delete(`/education/${id}`);
    return response.data;
  },
};