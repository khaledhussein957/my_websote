import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import newsReducer from './slices/newsSlice'
import categoryReducer from './slices/categorySlice'
import techstackReducer from './slices/techstackSlice'
import projectReducer from './slices/projectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
    category: categoryReducer,
    techstack: techstackReducer,
    project: projectReducer,
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
