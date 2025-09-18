import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Education type
interface Education {
    _id: string;
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    uri?: string;
}

interface EducationState {
    educations: Education[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: EducationState = {
    educations: [],
    loading: false,
    error: null,
    successMessage: null,
};

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        // Fetch
        fetchEducationsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        fetchEducationsSuccess(state, action: PayloadAction<Education[]>) {
            state.loading = false;
            state.educations = action.payload;
        },
        fetchEducationsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Create
        createEducationStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        createEducationSuccess(state, action: PayloadAction<Education>) {
            state.loading = false;
            state.educations.push(action.payload);
            state.successMessage = "Education record created successfully";
        },
        createEducationFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update
        updateEducationStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        updateEducationSuccess(state, action: PayloadAction<Education>) {
            state.loading = false;
            const index = state.educations.findIndex((e) => e._id === action.payload._id);
            if (index !== -1) state.educations[index] = action.payload;
            state.successMessage = "Education record updated successfully";
        },
        updateEducationFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deleteEducationStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        deleteEducationSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.educations = state.educations.filter((e) => e._id !== action.payload);
            state.successMessage = "Education record deleted successfully";
        },
        deleteEducationFailure(state, action: PayloadAction<string>) {
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
    fetchEducationsStart,
    fetchEducationsSuccess,
    fetchEducationsFailure,
    createEducationStart,
    createEducationSuccess,
    createEducationFailure,
    updateEducationStart,
    updateEducationSuccess,
    updateEducationFailure,
    deleteEducationStart,
    deleteEducationSuccess,
    deleteEducationFailure,
    clearError,
    clearSuccessMessage,
    setLoading,
} = educationSlice.actions;

export default educationSlice.reducer;
