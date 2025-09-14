import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'

// Types for news operations
export interface News {
  _id: string
  title: string
  description: string
  eventAt: string
  slug: string
  image?: string
  user: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

interface CreateNewsData {
  title: string
  description: string
  eventAt: string
  image?: File
}

interface UpdateNewsData {
  title: string
  description: string
  eventAt: string
  image?: File
}

interface NewsState {
  news: News[]
  currentNews: News | null
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  success: string | null
}

// Async thunks
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/news')
      return response.data.news // Backend returns { news: [...] }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch news'
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchNewsBySlug = createAsyncThunk(
  'news/fetchNewsBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/news/${slug}`)
      return response.data.news // Backend returns { news: {...} }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch news'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createNews = createAsyncThunk(
  'news/createNews',
  async (newsData: CreateNewsData, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append required fields
      formData.append('title', newsData.title)
      formData.append('description', newsData.description)
      formData.append('eventAt', newsData.eventAt)
      
      // Append image file if provided
      if (newsData.image) {
        formData.append('image', newsData.image)
      }

      const response = await api.post('/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.news // Backend returns { message, status, news }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create news'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ id, newsData }: { id: string; newsData: UpdateNewsData }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append required fields
      formData.append('title', newsData.title)
      formData.append('description', newsData.description)
      formData.append('eventAt', newsData.eventAt)
      
      // Append image file if provided
      if (newsData.image) {
        formData.append('image', newsData.image)
      }

      const response = await api.put(`/news/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.news // Backend returns { message, status, news }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update news'
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/news/${id}`)
      return { id, message: response.data.message } // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete news'
      return rejectWithValue(errorMessage)
    }
  }
)

const initialState: NewsState = {
  news: [],
  currentNews: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  success: null,
}

const newsSlice = createSlice({
  name: 'news',
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
    setCurrentNews: (state, action: PayloadAction<News | null>) => {
      state.currentNews = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.news = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Fetch News by Slug
      .addCase(fetchNewsBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentNews = action.payload
      })
      .addCase(fetchNewsBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Create News
      .addCase(createNews.pending, (state) => {
        state.isCreating = true
        state.error = null
        state.success = null
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isCreating = false
        state.news.unshift(action.payload) // Add to beginning of array
        state.success = 'News created successfully'
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.payload as string
      })
      
      // Update News
      .addCase(updateNews.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.success = null
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.news.findIndex(news => news._id === action.payload._id)
        if (index !== -1) {
          state.news[index] = action.payload
        }
        if (state.currentNews?._id === action.payload._id) {
          state.currentNews = action.payload
        }
        state.success = 'News updated successfully'
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload as string
      })
      
      // Delete News
      .addCase(deleteNews.pending, (state) => {
        state.isDeleting = true
        state.error = null
        state.success = null
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isDeleting = false
        state.news = state.news.filter(news => news._id !== action.payload.id)
        if (state.currentNews?._id === action.payload.id) {
          state.currentNews = null
        }
        state.success = action.payload.message
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess, clearMessages, setCurrentNews } = newsSlice.actions
export default newsSlice.reducer
