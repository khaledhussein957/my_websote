import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// TechStack types
interface TechStack {
    _id: string;
    name: string;
    icon?: string;
    category: string;
    proficiency: number; // 1-10
    user: string;
    createdAt: string;
    updatedAt: string;
}

interface CreateTechStackData {
    name: string;
    icon?: string;
    category: string;
    proficiency: number;
}

interface UpdateTechStackData {
    id: string;
    name?: string;
    icon?: string;
    category?: string;
    proficiency?: number;
}

export const techStackApi = createApi({
    reducerPath: "techStackApi",
    baseQuery,
    tagTypes: ["TechStack"],
    endpoints: (builder) => ({
        // Fetch all tech stacks
        fetchTechStacks: builder.query<TechStack[], void>({
            query: () => ({
                url: "/techstacks",
                method: "GET",
            }),
            providesTags: ["TechStack"],
        }),

        // Create tech stack
        createTechStack: builder.mutation<TechStack, CreateTechStackData>({
            query: (data) => ({
                url: "/techstacks",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TechStack"],
        }),

        // Update tech stack
        updateTechStack: builder.mutation<TechStack, UpdateTechStackData>({
            query: ({ id, ...data }) => ({
                url: `/techstacks/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["TechStack"],
        }),

        // Delete tech stack
        deleteTechStack: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/techstacks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TechStack"],
        }),
    }),
});

// Export hooks
export const {
    useFetchTechStacksQuery,
    useCreateTechStackMutation,
    useUpdateTechStackMutation,
    useDeleteTechStackMutation,
} = techStackApi;
