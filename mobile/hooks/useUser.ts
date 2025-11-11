import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessageController from "@/components/AlerMessageController";
import { userApi } from "@/api/users";

// Fetch a single user by ID
export const useUser = (id) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: () => userApi.getById(id),
		enabled: !!id,
		onError: (error: any) => AlertMessageController.error(error?.response?.data?.message || error.message || "failed to fetch user"),
	});
};

// Fetch all users
export const useUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: userApi.getAll,
		onError: (error: any) => AlertMessageController.error(error?.response?.data?.message || error.message || "Failed to fetch users"),
	});
};

// Update user
export const useUpdateUser = () => {
	return useMutation({
		mutationKey: ["updateUser"],
		mutationFn: userApi.updateAccount,
		onSuccess: () => AlertMessageController.success("User updated successfully!"),
		onError: (error) => AlertMessageController.error(error?.response?.data?.message || error.message || "Failed to update user"),
	});
};

// Delete user
export const useDeleteUser = () => {
	return useMutation({
		mutationKey: ["deleteUser"],
		mutationFn: userApi.deleteAccount,
		onSuccess: () => AlertMessageController.success("User deleted successfully!"),
		onError: (error) => AlertMessageController.error(error?.response?.data?.message || error.message || "Failed to delete user"),
	});
};

