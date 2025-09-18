import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
    successMessage: null,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        // Fetch
        fetchProjectsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        fetchProjectsSuccess(state, action: PayloadAction<Project[]>) {
            state.loading = false;
            state.projects = action.payload;
        },
        fetchProjectsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Create
        createProjectStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        createProjectSuccess(state, action: PayloadAction<Project>) {
            state.loading = false;
            state.projects.push(action.payload);
            state.successMessage = "Project created successfully";
        },
        createProjectFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update
        updateProjectStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        updateProjectSuccess(state, action: PayloadAction<Project>) {
            state.loading = false;
            const index = state.projects.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) state.projects[index] = action.payload;
            state.successMessage = "Project updated successfully";
        },
        updateProjectFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deleteProjectStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        deleteProjectSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.projects = state.projects.filter((p) => p._id !== action.payload);
            state.successMessage = "Project deleted successfully";
        },
        deleteProjectFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Common
        clearError(state) {
            state.error = null;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const {
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure,
    createProjectStart,
    createProjectSuccess,
    createProjectFailure,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectFailure,
    deleteProjectStart,
    deleteProjectSuccess,
    deleteProjectFailure,
    clearError,
    clearSuccessMessage,
    setLoading,
} = projectSlice.actions;

export default projectSlice.reducer;
