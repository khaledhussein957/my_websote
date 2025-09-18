import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Experience types
interface Experience {
  _id: string;
  title: string;
  description?: string;
  company: string;
  startYear: string;
  endYear: string;
  location: string;
}

interface CreateExperienceData {
  title: string;
  description?: string;
  company: string;
  startYear: string;
  endYear: string;
  location: string;
}

interface UpdateExperienceData {
  id: string;
  title?: string;
  description?: string;
  company?: string;
  startYear?: string;
  endYear?: string;
  location?: string;
}

export const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery,
  tagTypes: ["Experience"],
  endpoints: (builder) => ({
    // Fetch all experiences
    fetchExperiences: builder.query<Experience[], void>({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),

    // Create experience
    createExperience: builder.mutation<Experience, CreateExperienceData>({
      query: (data) => ({
        url: "/experiences",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    // Update experience
    updateExperience: builder.mutation<Experience, UpdateExperienceData>({
      query: ({ id, ...data }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    // Delete experience
    deleteExperience: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),
  }),
});

// Export hooks
export const {
  useFetchExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
