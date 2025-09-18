import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Testimonial type
interface Testimonial {
    _id: string;
    name: string;
    email: string;
    message: string;
    image?: string;
    rating: number; // 1-5 stars
}

interface TestimonialState {
    testimonials: Testimonial[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: TestimonialState = {
    testimonials: [],
    loading: false,
    error: null,
    successMessage: null,
};

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,
    reducers: {
        // Fetch
        fetchTestimonialsStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        fetchTestimonialsSuccess(state, action: PayloadAction<Testimonial[]>) {
            state.loading = false;
            state.testimonials = action.payload;
        },
        fetchTestimonialsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Create
        createTestimonialStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        createTestimonialSuccess(state, action: PayloadAction<Testimonial>) {
            state.loading = false;
            state.testimonials.push(action.payload);
            state.successMessage = "Testimonial created successfully";
        },
        createTestimonialFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update
        updateTestimonialStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        updateTestimonialSuccess(state, action: PayloadAction<Testimonial>) {
            state.loading = false;
            const index = state.testimonials.findIndex((t) => t._id === action.payload._id);
            if (index !== -1) state.testimonials[index] = action.payload;
            state.successMessage = "Testimonial updated successfully";
        },
        updateTestimonialFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete
        deleteTestimonialStart(state) {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        },
        deleteTestimonialSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.testimonials = state.testimonials.filter((t) => t._id !== action.payload);
            state.successMessage = "Testimonial deleted successfully";
        },
        deleteTestimonialFailure(state, action: PayloadAction<string>) {
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
    fetchTestimonialsStart,
    fetchTestimonialsSuccess,
    fetchTestimonialsFailure,
    createTestimonialStart,
    createTestimonialSuccess,
    createTestimonialFailure,
    updateTestimonialStart,
    updateTestimonialSuccess,
    updateTestimonialFailure,
    deleteTestimonialStart,
    deleteTestimonialSuccess,
    deleteTestimonialFailure,
    clearError,
    clearSuccessMessage,
    setLoading,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
