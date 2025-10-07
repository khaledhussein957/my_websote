import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.100.15:8080',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  // Prefer in-memory token if present in storage
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
