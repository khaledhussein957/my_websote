import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Category type
interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  successMessage: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Fetch categories
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create category
    createCategoryStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      state.categories.push(action.payload);
      state.successMessage = "Category created successfully";
    },
    createCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update category
    updateCategoryStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      const index = state.categories.findIndex((c) => c._id === action.payload._id);
      if (index !== -1) state.categories[index] = action.payload;
      state.successMessage = "Category updated successfully";
    },
    updateCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete category
    deleteCategoryStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.categories = state.categories.filter((c) => c._id !== action.payload);
      state.successMessage = "Category deleted successfully";
    },
    deleteCategoryFailure(state, action: PayloadAction<string>) {
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
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  clearError,
  clearSuccessMessage,
  setLoading,
} = categorySlice.actions;

export default categorySlice.reducer;
