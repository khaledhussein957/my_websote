import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Token and user management utilities
let storedToken: string | null = null;
let storedUser: any = null;
let storedPushToken: string | null = null;

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  storedToken = token || null;
  return storedToken;
};

// Synchronous version for baseQuery
const getTokenSync = () => {
  return storedToken;
};

const setToken = async (token: string) => {
  storedToken = token;
  await AsyncStorage.setItem("token", token);
};

const removeToken = async () => {
  storedToken = null;
  await AsyncStorage.removeItem("token");
  };

const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  storedUser = user ? JSON.parse(user) : null;
  return storedUser;
};

const setUser = async (user: any) => {
  storedUser = user;
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

const removeUser = async () => {
  storedUser = null;
  await AsyncStorage.removeItem("user");
};

const getPushToken = async () => {
  const pushToken = await AsyncStorage.getItem("pushToken");
  storedPushToken = pushToken || null;
  return storedPushToken;
};

const setPushToken = async (pushToken: string) => {
  storedPushToken = pushToken;
  await AsyncStorage.setItem("pushToken", pushToken);
};

const removePushToken = async () => {
  storedPushToken = null;
  await AsyncStorage.removeItem("pushToken");
};

export const baseQuery = fetchBaseQuery({
  baseUrl: api,
  prepareHeaders: (headers) => {
    const token = getTokenSync();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  validateStatus: (response) => {
    if (response.status === 401) {
      // Handle 401 synchronously - just clear memory
      storedToken = null;
      storedUser = null;
    }

    if (!response.ok) {
      return false;
    }

    return true;
  }
});

// Initialize stored data from AsyncStorage
const initializeStoredData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    const pushToken = await AsyncStorage.getItem("pushToken");
    
    if (token) {
      storedToken = token;
    }
    
    if (user) {
      storedUser = JSON.parse(user);
    }
    
    if (pushToken) {
      storedPushToken = pushToken;
    }
  } catch (error) {
    console.error("Error loading stored data:", error);
  }
};

// Check if user is logged in
const isLoggedIn = () => {
  return storedToken !== null && storedUser !== null;
};

// Export token and user management functions for external use
export const tokenUtils = {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  getPushToken,
  setPushToken,
  removePushToken,
  initializeStoredData,
  isLoggedIn
};