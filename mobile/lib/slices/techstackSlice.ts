import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'

// Types for techstack operations
export interface TechStack {
  _id: string
  name: string
  icon?: string
  category: string
  proficiency: number // 1-10 scale
  user: string
  createdAt: string
  updatedAt: string
}

interface CreateTechStackData {
  name: string
  category: string
  proficiency: number
  icon?: File
}

interface UpdateTechStackData {
  name?: string
  category?: string
  proficiency?: number
  icon?: File
}

interface TechStackState {
  techStacks: TechStack[]
  currentTechStack: TechStack | null
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  success: string | null
}

// Async thunks
export const fetchTechStacks = createAsyncThunk(
  'techstack/fetchTechStacks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/techstacks')
      return response.data.data // Backend returns { data: [...], status: "success" }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch tech stacks'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createTechStack = createAsyncThunk(
  'techstack/createTechStack',
  async (techStackData: CreateTechStackData, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append required fields
      formData.append('name', techStackData.name)
      formData.append('category', techStackData.category)
      formData.append('proficiency', techStackData.proficiency.toString())
      
      // Append icon file if provided
      if (techStackData.icon) {
        formData.append('image', techStackData.icon)
      }

      const response = await api.post('/techstacks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.data // Backend returns { data: {...}, status: "success" }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create tech stack'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateTechStack = createAsyncThunk(
  'techstack/updateTechStack',
  async ({ id, techStackData }: { id: string; techStackData: UpdateTechStackData }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append fields if provided
      if (techStackData.name) formData.append('name', techStackData.name)
      if (techStackData.category) formData.append('category', techStackData.category)
      if (techStackData.proficiency !== undefined) formData.append('proficiency', techStackData.proficiency.toString())
      
      // Append icon file if provided
      if (techStackData.icon) {
        formData.append('image', techStackData.icon)
      }

      const response = await api.put(`/techstacks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.data // Backend returns { data: {...}, status: "success" }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update tech stack'
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteTechStack = createAsyncThunk(
  'techstack/deleteTechStack',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/techstacks/${id}`)
      return { id, message: response.data.message } // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete tech stack'
      return rejectWithValue(errorMessage)
    }
  }
)

const initialState: TechStackState = {
  techStacks: [],
  currentTechStack: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  success: null,
}

const techstackSlice = createSlice({
  name: 'techstack',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = null
    },
    clearMessages: (state) => {
      state.error = null
      state.success = null
    },
    setCurrentTechStack: (state, action: PayloadAction<TechStack | null>) => {
      state.currentTechStack = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch TechStacks
      .addCase(fetchTechStacks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTechStacks.fulfilled, (state, action) => {
        state.isLoading = false
        state.techStacks = action.payload
      })
      .addCase(fetchTechStacks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Create TechStack
      .addCase(createTechStack.pending, (state) => {
        state.isCreating = true
        state.error = null
        state.success = null
      })
      .addCase(createTechStack.fulfilled, (state, action) => {
        state.isCreating = false
        state.techStacks.push(action.payload) // Add to end of array
        state.success = 'Tech stack created successfully'
      })
      .addCase(createTechStack.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.payload as string
      })
      
      // Update TechStack
      .addCase(updateTechStack.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.success = null
      })
      .addCase(updateTechStack.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.techStacks.findIndex(techStack => techStack._id === action.payload._id)
        if (index !== -1) {
          state.techStacks[index] = action.payload
        }
        if (state.currentTechStack?._id === action.payload._id) {
          state.currentTechStack = action.payload
        }
        state.success = 'Tech stack updated successfully'
      })
      .addCase(updateTechStack.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload as string
      })
      
      // Delete TechStack
      .addCase(deleteTechStack.pending, (state) => {
        state.isDeleting = true
        state.error = null
        state.success = null
      })
      .addCase(deleteTechStack.fulfilled, (state, action) => {
        state.isDeleting = false
        state.techStacks = state.techStacks.filter(techStack => techStack._id !== action.payload.id)
        if (state.currentTechStack?._id === action.payload.id) {
          state.currentTechStack = null
        }
        state.success = action.payload.message
      })
      .addCase(deleteTechStack.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess, clearMessages, setCurrentTechStack } = techstackSlice.actions
export default techstackSlice.reducer
