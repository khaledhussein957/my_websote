// User types matching backend model
export interface User {
  _id: string
  name: string
  email: string
  phone: string
  image?: string
  imageKey?: string
  title?: string
  about_me?: string
  createdAt: string
  updatedAt: string
}

// Auth types
export interface LoginCredentials {
  email: string // email or phone
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  message: string
  status: 'success' | 'error'
  user?: User
  token?: string
}

// API Response types
export interface ApiResponse<T = any> {
  message: string
  status: 'success' | 'error'
  data?: T
}

// Dashboard types (for future use)
export interface DashboardStats {
  totalUsers: number
  totalProjects: number
  totalNews: number
  totalTechStacks: number
  newUsersThisMonth: number
  newProjectsThisMonth: number
  newNewsThisMonth: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
}
