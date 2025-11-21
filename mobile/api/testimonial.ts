import axiosInstance from "@/lib/axios";

export interface TestimonialData {
  id: string;
  name: string;
  email: string;
  message: string;
  image?: string;
  rating: number;

  createdAt: string;
  updatedAt: string;
}

export const testimonialApi = {
  getTestimonials: async (): Promise<TestimonialData[]> => {
    const response = await axiosInstance.get("/testimonials");
    return response.data;
  },

  addTestimonial: async (
    formData: TestimonialData
  ): Promise<TestimonialData> => {
    const response = await axiosInstance.post("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTestimonial: async (
    testimonialId: string,
    formData: TestimonialData
  ): Promise<TestimonialData> => {
    const response = await axiosInstance.put(
      `/testimonials/${testimonialId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteTestimonial: async (
    testimonialId: string
  ): Promise<TestimonialData> => {
    const response = await axiosInstance.delete(
      `/testimonials/${testimonialId}`
    );
    return response.data;
  },
};
