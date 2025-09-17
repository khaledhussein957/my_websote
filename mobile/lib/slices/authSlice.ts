import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { User } from "../types";

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { identifier: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/login", credentials, {
        withCredentials: true,
      });
      const { user } = response.data;
      return { user };
    } catch (error: unknown) {
      let errorMessage = "Login failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response.data as { message?: string }).message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; phone: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/register", userData, {
        withCredentials: true,
      });
      const { user } = response.data;
      return { user };
    } catch (error: unknown) {
      let errorMessage = "Register failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response.data as { message?: string }).message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/check-auth", {
        withCredentials: true,
      });
      const { user } = response.data;
      return { user };
    } catch (error: unknown) {
      let errorMessage = "Check-auth failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response.data as { message?: string }).message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      return null;
    } catch (error: unknown) {
      let errorMessage = "Logout failed";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response.data as { message?: string }).message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
