
import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { educationApi } from "@/api/education";

export const useEducations = () => {
	return useQuery({
		queryKey: ["educations"],
		queryFn: educationApi.getEducations,
	});
};

export const useEducation = (id: any) => {
	return useQuery({
		queryKey: ["education", id],
		queryFn: () => educationApi.getEducation(id),
		enabled: !!id,
	});
};

export const useCreateEducation = () => {
	return useMutation({
		mutationKey: ["createEducation"],
		mutationFn: educationApi.addEducation,
		onSuccess: () => AlertMessage.success("Education created successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to create education"),
	});
};

export const useUpdateEducation = () => {
	return useMutation({
		mutationKey: ["updateEducation"],
		mutationFn: educationApi.updateEducation,
		onSuccess: () => AlertMessage.success("Education updated successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to update education"),
	});
};

export const useDeleteEducation = () => {
	return useMutation({
		mutationKey: ["deleteEducation"],
		mutationFn: educationApi.deleteEducation,
		onSuccess: () => AlertMessage.success("Education deleted successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to delete education"),
	});
};