import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { authApi } from "@/api/auth";

export const useRegister = () => {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: authApi.register,
		onSuccess: () => AlertMessage.success("Registration successful!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Registration failed"),
	});
};

export const useLogin = () => {
	return useMutation({
		mutationKey: ["login"],
		mutationFn: authApi.login,
		onSuccess: () => AlertMessage.success("Login successful!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Login failed"),
	});
};

export const useLogout = () => {
	return useMutation({
		mutationKey: ["logout"],
		mutationFn: authApi.logout,
		onSuccess: () => AlertMessage.success("Logged out successfully!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Logout failed"),
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationKey: ["forgotPassword"],
		mutationFn: authApi.forgotPassword,
		onSuccess: () => AlertMessage.success("Reset code sent!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to send reset code"),
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationKey: ["resetPassword"],
		mutationFn: authApi.resetPassword,
		onSuccess: () => AlertMessage.success("Password reset successful!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to reset password"),
	});
};

export const useResendResetCode = () => {
	return useMutation({
		mutationKey: ["resendResetCode"],
		mutationFn: authApi.resendResetCode,
		onSuccess: () => AlertMessage.success("Reset code resent!"),
		onError: (error: any) => AlertMessage.error(error?.response?.data?.message || error.message || "Failed to resend code"),
	});
};

export const useCheckAuth = () => {
	return useQuery({
		queryKey: ["auth", "check"],
		queryFn: authApi.checkAuth,
		enabled: false, // call manually
	});
};

