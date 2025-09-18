import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Category types
interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateCategoryData {
  name: string;
  description?: string;
}

interface UpdateCategoryData {
  id: string;
  name?: string;
  description?: string;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Fetch all categories
    fetchCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Create a new category
    createCategory: builder.mutation<Category, CreateCategoryData>({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update category
    updateCategory: builder.mutation<Category, UpdateCategoryData>({
      query: ({ id, ...data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete category
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

// Export hooks
export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
