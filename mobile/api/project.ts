import axiosInstance from "@/lib/axios";

export const projectApi = {
  getProjects: async () => {
    const response = await axiosInstance.get("/projects");
    return response.data;
  },

  createProject: async (formData) => {
    const response = await axiosInstance.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProject: async (id, formData) => {
    const response = await axiosInstance.put(`/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await axiosInstance.delete(`/projects/${id}`);
    return response.data;
  },
};