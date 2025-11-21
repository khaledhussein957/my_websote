import axiosInstance from "@/lib/axios";

export interface TechStackData {
  id: string;
  name: string;
  icon?: string;
  category?: string[];
  proficiency: number;
  createdAt: string;
  updatedAt: string;
}

export const techStackApi = {
  getTechStacks: async (): Promise<TechStackData[]> => {
    const response = await axiosInstance.get("/techstack");
    return response.data;
  },

  createTechStack: async (formData: TechStackData): Promise<TechStackData> => {
    const response = await axiosInstance.post("/techstack", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTechStack: async (
    id: string,
    formData: TechStackData
  ): Promise<TechStackData> => {
    const response = await axiosInstance.put(`/techstack/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteTechStack: async (id: string): Promise<TechStackData> => {
    const response = await axiosInstance.delete(`/techstack/${id}`);
    return response.data;
  },
};
