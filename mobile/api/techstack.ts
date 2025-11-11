import axiosInstance from "@/lib/axios";

export const techStackApi = {
  getTechStacks: async () => {
    const response = await axiosInstance.get("/techstack");
    return response.data;
  },

  createTechStack: async (formData) => {
    const response = await axiosInstance.post("/techstack", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTechStack: async (id, formData) => {
    const response = await axiosInstance.put(`/techstack/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteTechStack: async (id) => {
    const response = await axiosInstance.delete(`/techstack/${id}`);
    return response.data;
  },
};