import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

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

interface CreateNewsData {
    title: string;
    description: string;
    eventAt: string;
    slug: string;
    image?: string;
}

interface UpdateNewsData {
    id: string;
    title?: string;
    description?: string;
    eventAt?: string;
    slug?: string;
    image?: string;
}

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery,
    tagTypes: ["News"],
    endpoints: (builder) => ({
        // Fetch all news
        fetchNews: builder.query<News[], void>({
            query: () => ({
                url: "/news",
                method: "GET",
            }),
            providesTags: ["News"],
        }),

        // Create news
        createNews: builder.mutation<News, CreateNewsData>({
            query: (data) => ({
                url: "/news",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["News"],
        }),

        // Update news
        updateNews: builder.mutation<News, UpdateNewsData>({
            query: ({ id, ...data }) => ({
                url: `/news/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["News"],
        }),

        // Delete news
        deleteNews: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/news/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["News"],
        }),
    }),
});

// Export hooks
export const {
    useFetchNewsQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = newsApi;
