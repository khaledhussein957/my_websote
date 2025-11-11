import axiosInstance from "@/lib/axios";

export const testimonialApi = {
  getTestimonials: async () => {
    const response = await axiosInstance.get("/testimonials");
    return response.data;
  },

  addTestimonial: async (formData) => {
    const response = await axiosInstance.post("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTestimonial: async (testimonialId, formData) => {
    const response = await axiosInstance.put(
      `/testimonials/${testimonialId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteTestimonial: async (testimonialId) => {
    const response = await axiosInstance.delete(`/testimonials/${testimonialId}`);
    return response.data;
  },
};