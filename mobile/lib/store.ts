import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import newsReducer from './slices/newsSlice'
import categoryReducer from './slices/categorySlice'
import techstackReducer from './slices/techstackSlice'
import projectReducer from './slices/projectSlice'
import educationReducer from './slices/educationSlice'
import experienceReducer from './slices/experienceSlice'
import testimonialReducer from './slices/testimonialSlice'
import notificationReducer from './slices/notificationSlice'
import dashboardReducer from './slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
    category: categoryReducer,
    techstack: techstackReducer,
    project: projectReducer,
    education: educationReducer,
    experience: experienceReducer,
    testimonial: testimonialReducer,
    notification: notificationReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
