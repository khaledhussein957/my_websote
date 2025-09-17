import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'

// Types for project operations
export interface Project {
  _id: string
  title: string
  description: string
  githubUrl?: string
  liveDemoUrl?: string
  techStack: Array<{
    _id: string
    name: string
  }>
  isFeatured: boolean
  image?: string
  user: {
    _id: string
    name: string
    email: string
    title?: string
  }
  createdAt: string
  updatedAt: string
}

interface CreateProjectData {
  title: string
  description: string
  githubUrl?: string
  liveDemoUrl?: string
  techStack: string[]
  image?: File
}

interface UpdateProjectData {
  title?: string
  description?: string
  githubUrl?: string
  liveDemoUrl?: string
  techStack?: string[]
  image?: File
}

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  success: string | null
}

// Async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects')
      return response.data.data // Backend returns { message, status, data: [...] }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch projects'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData: CreateProjectData, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append required fields
      formData.append('title', projectData.title)
      formData.append('description', projectData.description)
      
      // Append optional fields
      if (projectData.githubUrl) formData.append('githubUrl', projectData.githubUrl)
      if (projectData.liveDemoUrl) formData.append('liveDemoUrl', projectData.liveDemoUrl)
      
      // Append techStack array
      projectData.techStack.forEach(techId => {
        formData.append('techStack', techId)
      })
      
      // Append image file if provided
      if (projectData.image) {
        formData.append('image', projectData.image)
      }

      const response = await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.data // Backend returns { data: {...}, status: "success", message }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create project'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, projectData }: { id: string; projectData: UpdateProjectData }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      // Append fields if provided
      if (projectData.title) formData.append('title', projectData.title)
      if (projectData.description) formData.append('description', projectData.description)
      if (projectData.githubUrl) formData.append('githubUrl', projectData.githubUrl)
      if (projectData.liveDemoUrl) formData.append('liveDemoUrl', projectData.liveDemoUrl)
      
      // Append techStack array if provided
      if (projectData.techStack && projectData.techStack.length > 0) {
        projectData.techStack.forEach(techId => {
          formData.append('techStack', techId)
        })
      }
      
      // Append image file if provided
      if (projectData.image) {
        formData.append('image', projectData.image)
      }

      const response = await api.put(`/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data.data // Backend returns { data: {...}, status: "success", message }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update project'
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/projects/${id}`)
      return { id, message: response.data.message } // Backend returns { message, status }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete project'
      return rejectWithValue(errorMessage)
    }
  }
)

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  success: null,
}

const projectSlice = createSlice({
  name: 'project',
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
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.isCreating = true
        state.error = null
        state.success = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isCreating = false
        state.projects.unshift(action.payload) // Add to beginning of array
        state.success = 'Project created successfully'
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isCreating = false
        state.error = action.payload as string
      })
      
      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.isUpdating = true
        state.error = null
        state.success = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isUpdating = false
        const index = state.projects.findIndex(project => project._id === action.payload._id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload
        }
        state.success = 'Project updated successfully'
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload as string
      })
      
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.isDeleting = true
        state.error = null
        state.success = null
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isDeleting = false
        state.projects = state.projects.filter(project => project._id !== action.payload.id)
        if (state.currentProject?._id === action.payload.id) {
          state.currentProject = null
        }
        state.success = action.payload.message
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isDeleting = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess, clearMessages, setCurrentProject } = projectSlice.actions
export default projectSlice.reducer
