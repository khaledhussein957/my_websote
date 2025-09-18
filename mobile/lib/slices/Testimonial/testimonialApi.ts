import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Testimonial type
interface Testimonial {
    _id: string;
    name: string;
    email: string;
    message: string;
    image?: string;
    rating: number; // 1-5 stars
}

interface CreateTestimonialData {
    name: string;
    email: string;
    message: string;
    image?: string;
    rating: number;
}

interface UpdateTestimonialData {
    id: string;
    name?: string;
    email?: string;
    message?: string;
    image?: string;
    rating?: number;
}

export const testimonialApi = createApi({
    reducerPath: "testimonialApi",
    baseQuery,
    tagTypes: ["Testimonial"],
    endpoints: (builder) => ({
        // Fetch all testimonials
        fetchTestimonials: builder.query<Testimonial[], void>({
            query: () => ({
                url: "/testimonials",
                method: "GET",
            }),
            providesTags: ["Testimonial"],
        }),

        // Create testimonial
        createTestimonial: builder.mutation<Testimonial, CreateTestimonialData>({
            query: (data) => ({
                url: "/testimonials",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Testimonial"],
        }),

        // Update testimonial
        updateTestimonial: builder.mutation<Testimonial, UpdateTestimonialData>({
            query: ({ id, ...data }) => ({
                url: `/testimonials/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Testimonial"],
        }),

        // Delete testimonial
        deleteTestimonial: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/testimonials/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Testimonial"],
        }),
    }),
});

// Export hooks
export const {
    useFetchTestimonialsQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
} = testimonialApi;
