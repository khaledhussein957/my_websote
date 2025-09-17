import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'

export interface Education {
  _id: string
  institution: string
  degree: string
  startYear: string
  endYear: string
  gpa?: string
  uri?: string
}

interface EducationState {
  educationList: Education[]
  isLoading: boolean
  isDeleting: boolean
  error: string | null
  success: string | null
}

const initialState: EducationState = {
  educationList: [],
  isLoading: false,
  isDeleting: false,
  error: null,
  success: null,
}

// Thunks
export const fetchEducations = createAsyncThunk(
  'education/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/educations')
      return res.data.data as Education[]
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch educations')
    }
  }
)

export const addEducation = createAsyncThunk(
  'education/add',
  async (data: Omit<Education, '_id'>, { rejectWithValue }) => {
    try {
      const res = await api.post('/educations', data)
      return res.data.data as Education
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add education')
    }
  }
)

export const updateEducation = createAsyncThunk(
  'education/update',
  async ({ id, data }: { id: string; data: Partial<Education> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/educations/${id}`, data)
      return res.data.data as Education
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update education')
    }
  }
)

export const deleteEducation = createAsyncThunk(
  'education/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/educations/${id}`)
      return id
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete education')
    }
  }
)

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    clearEducationError(state) {
      state.error = null
    },
    clearEducationSuccess(state) {
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEducations.fulfilled, (state, action: PayloadAction<Education[]>) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(addEducation.fulfilled, (state, action: PayloadAction<Education>) => {
        state.items.push(action.payload)
        state.success = 'Education added successfully'
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(updateEducation.fulfilled, (state, action: PayloadAction<Education>) => {
        state.items = state.items.map(e => e._id === action.payload._id ? action.payload : e)
        state.success = 'Education updated successfully'
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(deleteEducation.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(e => e._id !== action.payload)
        state.success = 'Education deleted successfully'
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearEducationError, clearEducationSuccess } = educationSlice.actions
export default educationSlice.reducer