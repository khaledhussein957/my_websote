import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { experienceApi, ExperienceData } from "@/api/experience";

export const useExperiences = () => {
  return useQuery<ExperienceData[]>({
    queryKey: ["experiences"],
    queryFn: experienceApi.getExperiences,
  });
};

export const useExperience = (id: string | undefined) => {
  return useQuery<ExperienceData>({
    queryKey: ["experience", id],
    queryFn: () => experienceApi.getExperience(id!),
    enabled: !!id,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createExperience"],
    mutationFn: (data: ExperienceData) => experienceApi.addExperience(data),
    onSuccess: () => {
      AlertMessage.success("Experience created successfully!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create experience"
      ),
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateExperience"],
    mutationFn: ({ id, data }: { id: string; data: ExperienceData }) =>
      experienceApi.updateExperience(id, data),
    onSuccess: () => {
      AlertMessage.success("Experience updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update experience"
      ),
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteExperience"],
    mutationFn: (id: string) => experienceApi.deleteExperience(id),
    onSuccess: () => {
      AlertMessage.success("Experience deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete experience"
      ),
  });
};
