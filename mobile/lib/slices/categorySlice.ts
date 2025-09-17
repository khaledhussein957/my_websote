import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'

// Types for category operations
export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  user: string
  createdAt: string
  updatedAt: string
}

interface CreateCategoryData {
  name: string
  description: string
}

interface UpdateCategoryData {
  name?: string
  description?: string
}

interface CategoryState {
  categories: Category[]
  currentCategory: Category | null
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  success: string | null
}

// Async thunks
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/categories')
      return response.data.data // Backend returns { message, status, data: [...] }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData: CreateCategoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/categories', categoryData)
      return response.data.data // Backend returns { message, status, data: {...} }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create category'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, categoryData }: { id: string; categoryData: UpdateCategoryData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData)
      return response.data.data // Backend returns { message, status, data: {...} }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update category'
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/categories/${id}`)
      return { id, message: response.data.message } // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category'
      return rejectWithValue(errorMessage)
    }
  }
)

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  success: null,
}

const categorySlice = createSlice({
  name: 'category',
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
    setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isCreating = true
        state.error = null
        state.success = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isCreating = false
        state.categories.push(action.payload) // Add to end of array
        state.success = 'Category created successfully'
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.payload as string
      })
      
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.success = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.categories.findIndex(category => category._id === action.payload._id)
        if (index !== -1) {
          state.categories[index] = action.payload
        }
        if (state.currentCategory?._id === action.payload._id) {
          state.currentCategory = action.payload
        }
        state.success = 'Category updated successfully'
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload as string
      })
      
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleting = true
        state.error = null
        state.success = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isDeleting = false
        state.categories = state.categories.filter(category => category._id !== action.payload.id)
        if (state.currentCategory?._id === action.payload.id) {
          state.currentCategory = null
        }
        state.success = action.payload.message
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess, clearMessages, setCurrentCategory } = categorySlice.actions
export default categorySlice.reducer
