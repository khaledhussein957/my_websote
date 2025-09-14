import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { storage } from '../storage'
import { api } from '../api'
import { User } from '../types'

// Attach token to axios headers when available
const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { user, token } = response.data

      console.log('Login response:', { user, token })
      storage.setItem('token', token)
      console.log('Token stored, verifying:', storage.getItem('token'))
      setAuthHeader(token)

      return { user, token }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { user, token } = response.data

      storage.setItem('token', token)
      setAuthHeader(token)

      return { user, token }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/check-auth',
  async (_, { rejectWithValue }) => {
    try {
      const token = storage.getItem('token')
      if (!token) return rejectWithValue('No token found')

      setAuthHeader(token)
      const response = await api.get('/auth/check-auth')
      const { user } = response.data

      return { user, token }
    } catch (error: any) {
      storage.removeItem('token')
      setAuthHeader(null)
      return rejectWithValue('Invalid token')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    storage.removeItem('token')
    setAuthHeader(null)
    return null
  }
)

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initializeAuth: (state) => {
      const token = storage.getItem('token')
      if (token) {
        state.token = token
        state.isAuthenticated = true
        setAuthHeader(token)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, setLoading, initializeAuth } = authSlice.actions
export default authSlice.reducer
