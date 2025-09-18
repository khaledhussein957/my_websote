import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";

export interface Experience {
  _id: string;
  title: string;
  description?: string;
  company: string;
  startYear: string;
  endYear: string;
  location: string;
}

interface ExperienceState {
  items: Experience[];
  isLoading: boolean;
  isDeleting: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ExperienceState = {
  items: [],
  isLoading: false,
  isDeleting: false,
  error: null,
  success: null,
};

// Thunks
export const fetchExperiences = createAsyncThunk(
  "experience/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/experiences");
      return res.data.data as Experience[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch experiences"
      );
    }
  }
);

export const addExperience = createAsyncThunk(
  "experience/add",
  async (data: Omit<Experience, "_id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/experiences", data);
      return res.data.data as Experience;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add experience"
      );
    }
  }
);

export const updateExperience = createAsyncThunk(
  "experience/update",
  async (
    { id, data }: { id: string; data: Partial<Experience> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/experiences/${id}`, data);
      return res.data.data as Experience;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update experience"
      );
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/experiences/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete experience"
      );
    }
  }
);

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    clearExperienceError(state) {
      state.error = null;
    },
    clearExperienceSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch experiences
      .addCase(fetchExperiences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchExperiences.fulfilled,
        (state, action: PayloadAction<Experience[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add experience
      .addCase(addExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addExperience.fulfilled,
        (state, action: PayloadAction<Experience>) => {
          state.isLoading = false;
          state.items.push(action.payload);
          state.success = "Experience added successfully";
        }
      )
      .addCase(addExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update experience
      .addCase(updateExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateExperience.fulfilled,
        (state, action: PayloadAction<Experience>) => {
          state.isLoading = false;
          state.items = state.items.map((e) =>
            e._id === action.payload._id ? action.payload : e
          );
          state.success = "Experience updated successfully";
        }
      )
      .addCase(updateExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete experience
      .addCase(deleteExperience.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(
        deleteExperience.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isDeleting = false;
          state.items = state.items.filter((e) => e._id !== action.payload);
          state.success = "Experience deleted successfully";
        }
      )
      .addCase(deleteExperience.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearExperienceError, clearExperienceSuccess } =
  experienceSlice.actions;
export default experienceSlice.reducer;
