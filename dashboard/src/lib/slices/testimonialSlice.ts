import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";

export interface Testimonial {
  _id: string;
  name: string;
  email: string;
  message: string;
  image?: string;
  rating: number;
}

interface TestimonialState {
  items: Testimonial[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TestimonialState = {
  items: [],
  isLoading: false,
  error: null,
  success: null,
};

// Thunks
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/testimonials");
      return res.data.data as Testimonial[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch testimonials");
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonial/add",
  async (data: Omit<Testimonial, "_id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/testimonials", data);
      return res.data.data as Testimonial;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add testimonial");
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonial/update",
  async ({ id, data }: { id: string; data: Partial<Testimonial> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/testimonials/${id}`, data);
      return res.data.data as Testimonial;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update testimonial");
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/testimonials/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete testimonial");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    clearTestimonialError(state) {
      state.error = null;
    },
    clearTestimonialSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action: PayloadAction<Testimonial[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // add
      .addCase(addTestimonial.fulfilled, (state, action: PayloadAction<Testimonial>) => {
        state.items.push(action.payload);
        state.success = "Testimonial added successfully";
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // update
      .addCase(updateTestimonial.fulfilled, (state, action: PayloadAction<Testimonial>) => {
        state.items = state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
        state.success = "Testimonial updated successfully";
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // delete
      .addCase(deleteTestimonial.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
        state.success = "Testimonial deleted successfully";
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearTestimonialError, clearTestimonialSuccess } = testimonialSlice.actions;
export default testimonialSlice.reducer;
