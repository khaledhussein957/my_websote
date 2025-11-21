import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import {
  educationApi,
  AddEducationDto,
  UpdateEducationDto,
  PaginationResponse,
  IEducation,
} from "@/api/education";
import { router } from "expo-router";

export const useEducations = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["educations", limit],
    queryFn: ({ pageParam = 1 }) =>
      educationApi.getEducations(pageParam, limit),
    getNextPageParam: (lastPage: PaginationResponse<IEducation>) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useEducation = (id: string | undefined) => {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => educationApi.getEducation(id!),
    enabled: !!id,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createEducation"],
    mutationFn: (data: AddEducationDto) => educationApi.addEducation(data),

    onSuccess: () => {
      AlertMessage.success("Education created successfully!");
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      router.back();
    },

    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create education"
      ),
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateEducation"],

    mutationFn: ({ id, ...data }: UpdateEducationDto & { id: string }) =>
      educationApi.updateEducation(id, data),

    onSuccess: () => {
      AlertMessage.success("Education updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },

    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update education"
      ),
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteEducation"],

    // FIX: Accept id properly
    mutationFn: (id: string) => educationApi.deleteEducation(id),

    onSuccess: () => {
      AlertMessage.success("Education deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },

    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete education"
      ),
  });
};
