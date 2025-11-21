import axiosInstance from "@/lib/axios";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  type: string;
  liveDemoUrl?: string;
  image?: string;
  featured: boolean;

  createdAt: string;
  updatedAt: string;
}

export const projectApi = {
  getProjects: async (): Promise<ProjectData[]> => {
    const response = await axiosInstance.get("/projects");
    return response.data;
  },

  createProject: async (formData: ProjectData): Promise<ProjectData> => {
    const response = await axiosInstance.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProject: async (
    id: string,
    formData: ProjectData
  ): Promise<ProjectData> => {
    const response = await axiosInstance.put(`/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProject: async (id: string): Promise<ProjectData> => {
    const response = await axiosInstance.delete(`/projects/${id}`);
    return response.data;
  },
};
