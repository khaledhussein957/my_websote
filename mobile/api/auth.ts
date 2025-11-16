import axiosInstance from "@/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertMessage from "@/components/AlerMessageController";

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  code: string;
  password: string;
  confirmPassword: string;
}

interface ResendResetCodeData {
  email: string;
}

// ✅ Helper to save user and token together
const saveUserAndToken = async (user: any, token: string) => {
  if (!user || !token) {
    AlertMessage.error("Cannot store user or token: value is missing");
  }

  await AsyncStorage.multiSet([
    ["user", JSON.stringify(user)],
    ["token", token],
  ]);
};

export const authApi = {
  register: async (data: RegisterData) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);

      // Safely store user and token
      await saveUserAndToken(response.data.newUser, response.data.token);

      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Registration failed");
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      await saveUserAndToken(response.data.user, response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove(["user", "token"]);
      return { success: true };
    } catch (error: any) {
      throw new Error(error?.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      if (user && token) {
        return { user: JSON.parse(user), token };
      }
      return null;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to check auth");
    }
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to send reset code");
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to reset password");
    }
  },

  resendResetCode: async (data: ResendResetCodeData) => {
    try {
      const response = await axiosInstance.post("/auth/resend-code", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message || "Failed to resend code");
    }
  },
};
