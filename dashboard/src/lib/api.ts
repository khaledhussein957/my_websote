import axios from 'axios'
import { storage } from './storage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Attach bearer token from local storage to each request if present
api.interceptors.request.use((config) => {
  try {
    const token = storage.getItem<string>('auth_token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (err) {
    // ignore storage errors
  }
  return config
})

// Optional: on 401 clear local token (frontend may handle re-login)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      try {
        storage.removeItem('auth_token')
      } catch {}
    }
    return Promise.reject(err)
  }
)
