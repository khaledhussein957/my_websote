import axiosInstance from "@/lib/axios";

export type ExperienceData = {
  id: string;
  title: string;
  description?: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;
};

export const experienceApi = {
  addExperience: async (data: ExperienceData): Promise<ExperienceData> => {
    const response = await axiosInstance.post("/experience", data);
    return response.data;
  },

  getExperiences: async (): Promise<ExperienceData[]> => {
    const response = await axiosInstance.get("/experience");
    return response.data;
  },

  getExperience: async (id: string): Promise<ExperienceData> => {
    const response = await axiosInstance.get(`/experience/${id}`);
    return response.data;
  },

  updateExperience: async (
    id: string,
    data: ExperienceData
  ): Promise<ExperienceData> => {
    const response = await axiosInstance.put(`/experience/${id}`, data);
    return response.data;
  },

  deleteExperience: async (id: string): Promise<ExperienceData> => {
    const response = await axiosInstance.delete(`/experience/${id}`);
    return response.data;
  },
};
