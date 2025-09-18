import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TechStack type
interface TechStack {
  _id: string;
  name: string;
  icon?: string;
  category: string;
  proficiency: number; // 1-10
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface TechStackState {
  techStacks: TechStack[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: TechStackState = {
  techStacks: [],
  loading: false,
  error: null,
  successMessage: null,
};

const techStackSlice = createSlice({
  name: "techStack",
  initialState,
  reducers: {
    // Fetch
    fetchTechStacksStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchTechStacksSuccess(state, action: PayloadAction<TechStack[]>) {
      state.loading = false;
      state.techStacks = action.payload;
    },
    fetchTechStacksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create
    createTechStackStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    createTechStackSuccess(state, action: PayloadAction<TechStack>) {
      state.loading = false;
      state.techStacks.push(action.payload);
      state.successMessage = "Tech stack created successfully";
    },
    createTechStackFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateTechStackStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateTechStackSuccess(state, action: PayloadAction<TechStack>) {
      state.loading = false;
      const index = state.techStacks.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) state.techStacks[index] = action.payload;
      state.successMessage = "Tech stack updated successfully";
    },
    updateTechStackFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteTechStackStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    deleteTechStackSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.techStacks = state.techStacks.filter((t) => t._id !== action.payload);
      state.successMessage = "Tech stack deleted successfully";
    },
    deleteTechStackFailure(state, action: PayloadAction<string>) {
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
  fetchTechStacksStart,
  fetchTechStacksSuccess,
  fetchTechStacksFailure,
  createTechStackStart,
  createTechStackSuccess,
  createTechStackFailure,
  updateTechStackStart,
  updateTechStackSuccess,
  updateTechStackFailure,
  deleteTechStackStart,
  deleteTechStackSuccess,
  deleteTechStackFailure,
  clearError,
  clearSuccessMessage,
  setLoading,
} = techStackSlice.actions;

export default techStackSlice.reducer;
