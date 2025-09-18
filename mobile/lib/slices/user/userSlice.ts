import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null; // for update, password change, or delete
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfileStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateProfileSuccess(state, action: PayloadAction<{ user: User; message: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    changePasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    changePasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload;
    },
    changePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAccountStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    deleteAccountSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.user = null;
      state.successMessage = action.payload;
    },
    deleteAccountFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Common actions
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
  clearError,
  clearSuccessMessage,
  setLoading,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
