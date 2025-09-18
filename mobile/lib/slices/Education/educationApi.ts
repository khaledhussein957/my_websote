import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Education types
interface Education {
    _id: string;
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    uri?: string;
}

interface CreateEducationData {
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    uri?: string;
}

interface UpdateEducationData {
    id: string;
    institution?: string;
    degree?: string;
    startYear?: string;
    endYear?: string;
    gpa?: string;
    uri?: string;
}

export const educationApi = createApi({
    reducerPath: "educationApi",
    baseQuery,
    tagTypes: ["Education"],
    endpoints: (builder) => ({
        // Fetch all education entries
        fetchEducations: builder.query<Education[], void>({
            query: () => ({
                url: "/educations",
                method: "GET",
            }),
            providesTags: ["Education"],
        }),

        // Create education
        createEducation: builder.mutation<Education, CreateEducationData>({
            query: (data) => ({
                url: "/educations",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Education"],
        }),

        // Update education
        updateEducation: builder.mutation<Education, UpdateEducationData>({
            query: ({ id, ...data }) => ({
                url: `/educations/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Education"],
        }),

        // Delete education
        deleteEducation: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/educations/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Education"],
        }),
    }),
});

// Export hooks
export const {
    useFetchEducationsQuery,
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
} = educationApi;
