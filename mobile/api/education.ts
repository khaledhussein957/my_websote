import axiosInstance from "@/lib/axios";

export interface IEducation {
  _id: string;
  institution: string;
  degree: string;
  startYear: number;
  endYear: number;
  gpa?: number;
  uri?: string;
  user?: any;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AddEducationDto {
  institution: string;
  degree: string;
  startYear: number;
  endYear: number;
  gpa?: number;
  uri?: string;
}

export interface UpdateEducationDto {
  institution?: string;
  degree?: string;
  startYear?: number;
  endYear?: number;
  gpa?: number;
  uri?: string;
}

export const educationApi = {
  getEducations: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginationResponse<IEducation>> => {
    const response = await axiosInstance.get(
      `/educations?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getEducation: async (id: string): Promise<IEducation> => {
    const response = await axiosInstance.get(`/educations/${id}`);
    return response.data;
  },

  addEducation: async (data: AddEducationDto): Promise<IEducation> => {
    const response = await axiosInstance.post("/educations", data);
    return response.data;
  },

  updateEducation: async (
    id: string,
    data: UpdateEducationDto
  ): Promise<IEducation> => {
    const response = await axiosInstance.put(`/educations/${id}`, data);
    return response.data;
  },

  deleteEducation: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/educations/${id}`);
    return response.data;
  },
};
