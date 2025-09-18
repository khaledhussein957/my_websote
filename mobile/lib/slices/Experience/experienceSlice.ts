import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Experience type
interface Experience {
    _id: string;
    title: string;
    description?: string;
    company: string;
    startYear: string;
    endYear: string;
    location: string;
}

interface ExperienceState {
    experiences: Experience[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: ExperienceState = {
    experiences: [],
    loading: false,
    error: null,
    successMessage: null,
};

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        // Fetch
        fetchExperiencesStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        fetchExperiencesSuccess(state, action: PayloadAction<Experience[]>) {
            state.loading = false;
            state.experiences = action.payload;
        },
        fetchExperiencesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Create
        createExperienceStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        createExperienceSuccess(state, action: PayloadAction<Experience>) {
            state.loading = false;
            state.experiences.push(action.payload);
            state.successMessage = "Experience created successfully";
        },
        createExperienceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update
        updateExperienceStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        updateExperienceSuccess(state, action: PayloadAction<Experience>) {
            state.loading = false;
            const index = state.experiences.findIndex((e) => e._id === action.payload._id);
            if (index !== -1) state.experiences[index] = action.payload;
            state.successMessage = "Experience updated successfully";
        },
        updateExperienceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deleteExperienceStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        deleteExperienceSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.experiences = state.experiences.filter((e) => e._id !== action.payload);
            state.successMessage = "Experience deleted successfully";
        },
        deleteExperienceFailure(state, action: PayloadAction<string>) {
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
    fetchExperiencesStart,
    fetchExperiencesSuccess,
    fetchExperiencesFailure,
    createExperienceStart,
    createExperienceSuccess,
    createExperienceFailure,
    updateExperienceStart,
    updateExperienceSuccess,
    updateExperienceFailure,
    deleteExperienceStart,
    deleteExperienceSuccess,
    deleteExperienceFailure,
    clearError,
    clearSuccessMessage,
    setLoading,
} = experienceSlice.actions;

export default experienceSlice.reducer;
