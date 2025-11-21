import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { testimonialApi, TestimonialData } from "@/api/testimonial";

export const useTestimonials = () => {
  return useQuery<TestimonialData[]>({
    queryKey: ["testimonials"],
    queryFn: testimonialApi.getTestimonials,
  });
};

export const useAddTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addTestimonial"],
    mutationFn: (data: TestimonialData) => testimonialApi.addTestimonial(data),
    onSuccess: () => {
      AlertMessage.success("Testimonial added successfully!");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add testimonial"
      ),
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTestimonial"],
    mutationFn: ({ id, data }: { id: string; data: TestimonialData }) =>
      testimonialApi.updateTestimonial(id, data),
    onSuccess: () => {
      AlertMessage.success("Testimonial updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update testimonial"
      ),
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTestimonial"],
    mutationFn: (id: string) => testimonialApi.deleteTestimonial(id),
    onSuccess: () => {
      AlertMessage.success("Testimonial deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete testimonial"
      ),
  });
};
