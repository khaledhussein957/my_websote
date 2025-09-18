import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  forgotPasswordMessage?: string | null;
  resetPasswordMessage?: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  forgotPasswordMessage: null,
  resetPasswordMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
    },

    // Logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },

    // Forgot password
    forgotPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.forgotPasswordMessage = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.forgotPasswordMessage = action.payload;
      state.error = null;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.forgotPasswordMessage = null;
    },

    // Reset password
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.resetPasswordMessage = null;
    },
    resetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.resetPasswordMessage = action.payload;
      state.error = null;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.resetPasswordMessage = null;
    },

    // Common
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearError,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
