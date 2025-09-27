import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService, User, Project, Education, Experience, Testimonial, TechStack, News } from '@/lib/api';

// Async thunks
export const fetchUser = createAsyncThunk('portfolio/fetchUser', async () => {
  const response = await apiService.getUsers();
  return response.data; // Return the full data object with array
});

export const fetchProjects = createAsyncThunk('portfolio/fetchProjects', async () => {
  const response = await apiService.getProjects();
  return response.data;
});

export const fetchEducations = createAsyncThunk('portfolio/fetchEducations', async () => {
  const response = await apiService.getEducations();
  return response.data;
});

export const fetchExperiences = createAsyncThunk('portfolio/fetchExperiences', async () => {
  const response = await apiService.getExperiences();
  return response.data;
});

export const fetchTestimonials = createAsyncThunk('portfolio/fetchTestimonials', async () => {
  const response = await apiService.getTestimonials();
  return response.data;
});

export const fetchTechStacks = createAsyncThunk('portfolio/fetchTechStacks', async () => {
  const response = await apiService.getTechStacks();
  return response.data;
});

export const fetchNews = createAsyncThunk('portfolio/fetchNews', async () => {
  const response = await apiService.getNews();
  return response.data;
});

interface PortfolioState {
  user: User | null;
  projects: Project[];
  educations: Education[];
  experiences: Experience[];
  testimonials: Testimonial[];
  techStacks: TechStack[];
  news: News[];
  loading: {
    user: boolean;
    projects: boolean;
    educations: boolean;
    experiences: boolean;
    testimonials: boolean;
    techStacks: boolean;
    news: boolean;
  };
  error: string | null;
}

const initialState: PortfolioState = {
  user: null,
  projects: [],
  educations: [],
  experiences: [],
  testimonials: [],
  techStacks: [],
  news: [],
  loading: {
    user: false,
    projects: false,
    educations: false,
    experiences: false,
    testimonials: false,
    techStacks: false,
    news: false,
  },
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // User
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading.user = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading.user = false;
        state.user = action.payload[0]; // Get first user from array
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading.user = false;
        state.error = action.error.message || 'Failed to fetch user';
      });

    // Projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading.projects = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading.projects = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading.projects = false;
        state.error = action.error.message || 'Failed to fetch projects';
      });

    // Educations
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.loading.educations = true;
        state.error = null;
      })
      .addCase(fetchEducations.fulfilled, (state, action: PayloadAction<Education[]>) => {
        state.loading.educations = false;
        state.educations = action.payload;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.loading.educations = false;
        state.error = action.error.message || 'Failed to fetch educations';
      });

    // Experiences
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading.experiences = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action: PayloadAction<Experience[]>) => {
        state.loading.experiences = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading.experiences = false;
        state.error = action.error.message || 'Failed to fetch experiences';
      });

    // Testimonials
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading.testimonials = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action: PayloadAction<Testimonial[]>) => {
        state.loading.testimonials = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading.testimonials = false;
        state.error = action.error.message || 'Failed to fetch testimonials';
      });

    // Tech Stacks
    builder
      .addCase(fetchTechStacks.pending, (state) => {
        state.loading.techStacks = true;
        state.error = null;
      })
      .addCase(fetchTechStacks.fulfilled, (state, action: PayloadAction<TechStack[]>) => {
        state.loading.techStacks = false;
        state.techStacks = action.payload;
      })
      .addCase(fetchTechStacks.rejected, (state, action) => {
        state.loading.techStacks = false;
        state.error = action.error.message || 'Failed to fetch tech stacks';
      });

    // News
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading.news = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading.news = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading.news = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export const { clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
