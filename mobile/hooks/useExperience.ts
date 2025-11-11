import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { experienceApi } from "@/api/experience";

export const useExperiences = () => {
    return useQuery({
        queryKey: ["experiences"],
        queryFn: experienceApi.getExperiences,
    });
};

export const useExperience = (id: any) => {
    return useQuery({
        queryKey: ["experience", id],
        queryFn: () => experienceApi.getExperience(id),
        enabled: !!id,
    })
};

export const useCreateEducation = () => {
	return useMutation({
		mutationKey: ["createExperience"],
		mutationFn: experienceApi.addExperience,
		onSuccess: () => AlertMessage.success("Experience created successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to create experience"),
	});
};

export const useUpdateExperience = () => {
	return useMutation({
		mutationKey: ["updateExperience"],
		mutationFn: experienceApi.updateExperience,
		onSuccess: () => AlertMessage.success("Experience updated successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to update experience"),
	});
};

export const useDeleteEducation = () => {
	return useMutation({
		mutationKey: ["deleteExperience"],
		mutationFn: experienceApi.deleteExperience,
		onSuccess: () => AlertMessage.success("Education deleted successfully!"),
		onError: (error) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to delete education"),
	});
};