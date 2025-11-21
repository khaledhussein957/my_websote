import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { authApi } from "@/api/auth";
import { router } from "expo-router";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: authApi.register,
    onSuccess: () => {
      AlertMessage.success("Registration successful!"),
        // navigate to dashboard
        router.push("/(drawer)/(tabs)");
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message || error.message || "Registration failed"
      ),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.login,
    onSuccess: () => {
      AlertMessage.success("Login successful!"),
        // navigate to dashboard
        router.push("/(drawer)/(tabs)");
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message || error.message || "Login failed"
      ),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Invalidate auth query to update auth state
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      // Clear all queries to reset app state
      queryClient.clear();
      AlertMessage.success("Logged out successfully!");
      // Redirect to login screen
      router.replace("/(auth)/loginScreen");
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message || error.message || "Logout failed"
      ),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      AlertMessage.success("Reset code sent!");

      // navigate to reset password screen
      router.replace("/(auth)/resetPasswordScreen");
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to send reset code"
      ),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      AlertMessage.success("Password reset successful!");

      // navigate to login screen
      router.replace("/(auth)/loginScreen");
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to reset password"
      ),
  });
};

export const useResendResetCode = () => {
  return useMutation({
    mutationKey: ["resendResetCode"],
    mutationFn: authApi.resendResetCode,
    onSuccess: () => AlertMessage.success("Reset code resent!"),
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to resend code"
      ),
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["auth", "check"],
    queryFn: authApi.checkAuth,
    enabled: true,
  });
};
