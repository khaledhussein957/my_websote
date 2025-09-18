import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Types
interface TechStack {
    _id: string;
    name: string;
}

interface ProjectUser {
    _id: string;
    name: string;
    email: string;
    title?: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    githubUrl?: string;
    liveDemoUrl?: string;
    techStack: TechStack[];
    isFeatured: boolean;
    image?: string;
    user: ProjectUser;
    createdAt: string;
    updatedAt: string;
}

interface CreateProjectData {
    title: string;
    description: string;
    githubUrl?: string;
    liveDemoUrl?: string;
    techStack: string[]; // array of techStack IDs
    isFeatured: boolean;
    image?: string;
}

interface UpdateProjectData {
    id: string;
    title?: string;
    description?: string;
    githubUrl?: string;
    liveDemoUrl?: string;
    techStack?: string[]; // array of techStack IDs
    isFeatured?: boolean;
    image?: string;
}

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery,
    tagTypes: ["Project"],
    endpoints: (builder) => ({
        // Fetch all projects
        fetchProjects: builder.query<Project[], void>({
            query: () => ({
                url: "/projects",
                method: "GET",
            }),
            providesTags: ["Project"],
        }),

        // Create project
        createProject: builder.mutation<Project, CreateProjectData>({
            query: (data) => ({
                url: "/projects",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }),

        // Update project
        updateProject: builder.mutation<Project, UpdateProjectData>({
            query: ({ id, ...data }) => ({
                url: `/projects/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }),

        // Delete project
        deleteProject: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
    }),
});

// Export hooks
export const {
    useFetchProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;
