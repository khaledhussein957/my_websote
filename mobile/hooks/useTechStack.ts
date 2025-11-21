import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { techStackApi, TechStackData } from "@/api/techstack";

export const useTechStacks = () => {
  return useQuery<TechStackData[]>({
    queryKey: ["techStacks"],
    queryFn: techStackApi.getTechStacks,
  });
};

export const useCreateTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTechStack"],
    mutationFn: (data: TechStackData) => techStackApi.createTechStack(data),
    onSuccess: () => {
      AlertMessage.success("Tech stack created successfully!");
      queryClient.invalidateQueries({ queryKey: ["techStacks"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create tech stack"
      ),
  });
};

export const useUpdateTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTechStack"],
    mutationFn: ({ id, data }: { id: string; data: TechStackData }) =>
      techStackApi.updateTechStack(id, data),
    onSuccess: () => {
      AlertMessage.success("Tech stack updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["techStacks"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update tech stack"
      ),
  });
};

export const useDeleteTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTechStack"],
    mutationFn: (id: string) => techStackApi.deleteTechStack(id),
    onSuccess: () => {
      AlertMessage.success("Tech stack deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["techStacks"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete tech stack"
      ),
  });
};
