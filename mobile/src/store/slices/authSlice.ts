import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthState = {
  token: string | null;
  user: User;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: NonNullable<User> }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<NonNullable<User>>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
export default authSlice.reducer;
