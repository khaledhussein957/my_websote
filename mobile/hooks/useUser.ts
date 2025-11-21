import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessageController from "@/components/AlerMessageController";
import { userApi, ChangePasswordData } from "@/api/users";

// Update user account
export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: userApi.updateAccount,
    onSuccess: () =>
      AlertMessageController.success("Account updated successfully!"),
    onError: (error: any) =>
      AlertMessageController.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update account"
      ),
  });
};

// Change password
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (data: ChangePasswordData) => userApi.changePassword(data),
    onSuccess: () =>
      AlertMessageController.success("Password changed successfully!"),
    onError: (error: any) =>
      AlertMessageController.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to change password"
      ),
  });
};

// Delete user account
export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: userApi.deleteAccount,
    onSuccess: () =>
      AlertMessageController.success("Account deleted successfully!"),
    onError: (error: any) =>
      AlertMessageController.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete account"
      ),
  });
};
