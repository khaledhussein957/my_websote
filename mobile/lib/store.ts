import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/Auth/authSlice";
import { authApi } from "./slices/Auth/authApi";
import userReducer from "./slices/user/userSlice"
import { userApi } from "./slices/user/userApi";
import categoryReducer from "./slices/Category/categorySlice";
import { categoryApi } from "./slices/Category/categoryApi";
import techstackReducer from "./slices/TechStack/techStackSlice";
import { techStackApi } from "./slices/TechStack/techStackApi";
import educationReducer from "./slices/Education/educationSlice";
import { educationApi } from "./slices/Education/educationApi";
import experienceReducer from "./slices/Experience/experienceSlice";
import { experienceApi } from "./slices/Experience/experienceApi";
import dashboardReducer from "./slices/Dashboard/dashboardSlice";
import { dashboardApi } from "./slices/Dashboard/dashboardApi";
import newsReducer from "./slices/News/newsSlice";
import { newsApi } from "./slices/News/newsApi";
import projectReducer from "./slices/Project/projectSlice";
import { projectApi } from "./slices/Project/projectApi";
import notificationReducer from "./slices/Notification/notificationSlice";
import { notificationApi } from "./slices/Notification/notificationApi";
import testimonialReducer from "./slices/Testimonial/testimonialSlice";
import { testimonialApi } from "./slices/Testimonial/testimonialApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    category: categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    techstack: techstackReducer,
    [techStackApi.reducerPath]: techStackApi.reducer,
    education: educationReducer,
    [educationApi.reducerPath]: educationApi.reducer,
    experience: experienceReducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    dashboard: dashboardReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    project: projectReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    notification: notificationReducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    testimonial: testimonialReducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      techStackApi.middleware,
      educationApi.middleware,
      experienceApi.middleware,
      dashboardApi.middleware,
      newsApi.middleware,
      projectApi.middleware,
      notificationApi.middleware,
      testimonialApi.middleware,
    ),
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
