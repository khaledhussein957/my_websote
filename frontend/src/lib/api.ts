import axios from 'axios';
import { 
  demoUser, 
  demoProjects, 
  demoEducations, 
  demoExperiences, 
  demoTestimonials, 
  demoTechStacks 
} from './demo-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to handle API errors and return demo data
const handleApiError = (error: any, demoData: any) => {
  console.warn('API Error, using demo data:', error.message);
  return { data: demoData };
};

// API endpoints
export const endpoints = {
  users: '/api/users',
  projects: '/api/projects',
  educations: '/api/educations',
  experiences: '/api/experiences',
  testimonials: '/api/testimonials',
  techstacks: '/api/techstacks',
  categories: '/api/categories',
  news: '/api/news',
} as const;

// API service functions with fallback to demo data
export const apiService = {
  // Users
  getUsers: async () => {
    try {
      const response = await api.get(endpoints.users);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, [demoUser]);
    }
  },
  getUser: async (id: string) => {
    try {
      return await api.get(`${endpoints.users}/${id}`);
    } catch (error) {
      return handleApiError(error, demoUser);
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const response = await api.get(endpoints.projects);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, demoProjects);
    }
  },
  getProject: async (id: string) => {
    try {
      return await api.get(`${endpoints.projects}/${id}`);
    } catch (error) {
      const project = demoProjects.find(p => p.id === id);
      return handleApiError(error, project);
    }
  },

  // Education
  getEducations: async () => {
    try {
      const response = await api.get(endpoints.educations);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, demoEducations);
    }
  },
  getEducation: async (id: string) => {
    try {
      return await api.get(`${endpoints.educations}/${id}`);
    } catch (error) {
      const education = demoEducations.find(e => e.id === id);
      return handleApiError(error, education);
    }
  },

  // Experience
  getExperiences: async () => {
    try {
      const response = await api.get(endpoints.experiences);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, demoExperiences);
    }
  },
  getExperience: async (id: string) => {
    try {
      return await api.get(`${endpoints.experiences}/${id}`);
    } catch (error) {
      const experience = demoExperiences.find(e => e.id === id);
      return handleApiError(error, experience);
    }
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const response = await api.get(endpoints.testimonials);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, demoTestimonials);
    }
  },
  getTestimonial: async (id: string) => {
    try {
      return await api.get(`${endpoints.testimonials}/${id}`);
    } catch (error) {
      const testimonial = demoTestimonials.find(t => t.id === id);
      return handleApiError(error, testimonial);
    }
  },

  // Tech Stacks
  getTechStacks: async () => {
    try {
      const response = await api.get(endpoints.techstacks);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      return handleApiError(error, demoTechStacks);
    }
  },
  getTechStack: async (id: string) => {
    try {
      return await api.get(`${endpoints.techstacks}/${id}`);
    } catch (error) {
      const techStack = demoTechStacks.find(t => t.id === id);
      return handleApiError(error, techStack);
    }
  },

  // Categories
  getCategories: async () => {
    try {
      return await api.get(endpoints.categories);
    } catch (error) {
      return handleApiError(error, []);
    }
  },
  getCategory: async (id: string) => {
    try {
      return await api.get(`${endpoints.categories}/${id}`);
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  // News
  getNews: async () => {
    try {
      return await api.get(endpoints.news);
    } catch (error) {
      return handleApiError(error, []);
    }
  },
  getNewsBySlug: async (slug: string) => {
    try {
      return await api.get(`${endpoints.news}/${slug}`);
    } catch (error) {
      return handleApiError(error, null);
    }
  },
};

// Types
export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  title?: string;
  about_me?: string;
  bio?: string; // For backward compatibility
  image?: string;
  avatar?: string; // For backward compatibility
  imageKey?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  resetPasswordCode?: string;
  resetPasswordExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  id?: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  techStack?: Array<{ _id: string; name: string }>;
  githubUrl?: string;
  githubLink?: string;
  liveUrl?: string;
  liveLink?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    email: string;
    name: string;
    title: string;
  };
}

export interface Education {
  _id: string;
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  startYear?: string;
  endDate?: string;
  endYear?: string;
  description?: string;
  gpa?: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  id?: string;
  company: string;
  position?: string;
  title?: string;
  startDate?: string;
  startYear?: string;
  endDate?: string;
  endYear?: string;
  description: string;
  location?: string;
  current?: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface TechStack {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
