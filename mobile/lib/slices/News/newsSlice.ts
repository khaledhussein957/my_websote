import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// News types
interface NewsUser {
    _id: string;
    name: string;
    email: string;
}

interface News {
    _id: string;
    title: string;
    description: string;
    eventAt: string;
    slug: string;
    image?: string;
    user: NewsUser;
    createdAt: string;
    updatedAt: string;
}

interface NewsState {
    newsList: News[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: NewsState = {
    newsList: [],
    loading: false,
    error: null,
    successMessage: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        // Fetch
        fetchNewsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        fetchNewsSuccess(state, action: PayloadAction<News[]>) {
            state.loading = false;
            state.newsList = action.payload;
        },
        fetchNewsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Create
        createNewsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        createNewsSuccess(state, action: PayloadAction<News>) {
            state.loading = false;
            state.newsList.push(action.payload);
            state.successMessage = "News created successfully";
        },
        createNewsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update
        updateNewsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        updateNewsSuccess(state, action: PayloadAction<News>) {
            state.loading = false;
            const index = state.newsList.findIndex((n) => n._id === action.payload._id);
            if (index !== -1) state.newsList[index] = action.payload;
            state.successMessage = "News updated successfully";
        },
        updateNewsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deleteNewsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        deleteNewsSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.newsList = state.newsList.filter((n) => n._id !== action.payload);
            state.successMessage = "News deleted successfully";
        },
        deleteNewsFailure(state, action: PayloadAction<string>) {
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
    fetchNewsStart,
    fetchNewsSuccess,
    fetchNewsFailure,
    createNewsStart,
    createNewsSuccess,
    createNewsFailure,
    updateNewsStart,
    updateNewsSuccess,
    updateNewsFailure,
    deleteNewsStart,
    deleteNewsSuccess,
    deleteNewsFailure,
    clearError,
    clearSuccessMessage,
    setLoading,
} = newsSlice.actions;

export default newsSlice.reducer;
