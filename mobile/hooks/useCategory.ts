
import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { categoryApi } from "@/api/category";

export const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: categoryApi.getCategories,
	});
};

export const useCreateCategory = () => {
	return useMutation({
		mutationKey: ["createCategory"],
		mutationFn: categoryApi.addCategory,
		onSuccess: () => AlertMessage.success("Category created successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to create category"),
	});
};

export const useUpdateCategory = () => {
	return useMutation({
		mutationKey: ["updateCategory"],
		mutationFn: categoryApi.updateCategory,
		onSuccess: () => AlertMessage.success("Category updated successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to update category"),
	});
};

export const useDeleteCategory = () => {
	return useMutation({
		mutationKey: ["deleteCategory"],
		mutationFn: categoryApi.deleteCategory,
		onSuccess: () => AlertMessage.success("Category deleted successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to delete category"),
	});
};