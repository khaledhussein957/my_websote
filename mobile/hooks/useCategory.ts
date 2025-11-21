import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { categoryApi, CategoryData } from "@/api/category";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: CategoryData) => categoryApi.addCategory(data),
    onSuccess: () => {
      AlertMessage.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create category"
      ),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: ({ id, data }: { id: string; data: CategoryData }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      AlertMessage.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update category"
      ),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      AlertMessage.success("Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete category"
      ),
  });
};
