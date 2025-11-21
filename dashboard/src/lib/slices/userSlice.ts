import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { User } from "../types";

// Types for user operations
interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  title?: string;
  about_me?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  image?: File;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  isChangingPassword: boolean;
  isDeleting: boolean;
  error: string | null;
  success: string | null;
}

// Async thunks
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData: UpdateProfileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append non-file fields
      if (profileData.name) formData.append("name", profileData.name);
      if (profileData.email) formData.append("email", profileData.email);
      if (profileData.phone) formData.append("phone", profileData.phone);
      if (profileData.location)
        formData.append("location", profileData.location);
      if (profileData.title) formData.append("title", profileData.title);
      if (profileData.about_me)
        formData.append("about_me", profileData.about_me);

      // Append social media fields
      if (profileData.linkedin)
        formData.append("linkedin", profileData.linkedin);
      if (profileData.github) formData.append("github", profileData.github);
      if (profileData.instagram)
        formData.append("instagram", profileData.instagram);
      if (profileData.facebook)
        formData.append("facebook", profileData.facebook);

      // Append image file if provided
      if (profileData.image) {
        formData.append("image", profileData.image);
      }

      const response = await api.put("/users/update-account", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data; // Backend returns { message, status, data: user }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordData: ChangePasswordData, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/update-password", passwordData);
      return response.data.message; // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/users/delete-account");
      return response.data.message; // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  isUpdating: false,
  isChangingPassword: false,
  isDeleting: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentUser = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isChangingPassword = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isChangingPassword = false;
        state.success = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isChangingPassword = false;
        state.error = action.payload as string;
      })

      // Delete Account
      .addCase(deleteAccount.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isDeleting = false;
        state.currentUser = null;
        state.success = "Account deleted successfully";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess, clearMessages, setCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
