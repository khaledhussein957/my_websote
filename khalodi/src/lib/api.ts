import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle API errors and return demo data
const handleApiError = <T>(error: unknown, demoData: T) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.warn("API Error, using demo data:", errorMessage);
  return { data: demoData };
};

// API endpoints
export const endpoints = {
  users: "/api/users",
  projects: "/api/projects",
  educations: "/api/educations",
  experiences: "/api/experiences",
  testimonials: "/api/testimonials",
  techstacks: "/api/techstacks",
  categories: "/api/categories",
  news: "/api/news",
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
      // throw the error
      throw error;
    }
  },
  getUser: async (id: string) => {
    try {
      return await api.get(`${endpoints.users}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const response = await api.get(endpoints.projects);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      throw error;
    }
  },
  getProject: async (id: string) => {
    try {
      return await api.get(`${endpoints.projects}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Education
  getEducations: async () => {
    try {
      const response = await api.get(endpoints.educations);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      throw error;
    }
  },
  getEducation: async (id: string) => {
    try {
      return await api.get(`${endpoints.educations}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Experience
  getExperiences: async () => {
    try {
      const response = await api.get(endpoints.experiences);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      throw error;
    }
  },
  getExperience: async (id: string) => {
    try {
      return await api.get(`${endpoints.experiences}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const response = await api.get(endpoints.testimonials);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      throw error;
    }
  },
  getTestimonial: async (id: string) => {
    try {
      return await api.get(`${endpoints.testimonials}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Tech Stacks
  getTechStacks: async () => {
    try {
      const response = await api.get(endpoints.techstacks);
      // Handle API response structure: { message, status, data }
      return { data: response.data.data || response.data };
    } catch (error) {
      throw error;
    }
  },
  getTechStack: async (id: string) => {
    try {
      return await api.get(`${endpoints.techstacks}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      return await api.get(endpoints.categories);
    } catch (error) {
      throw error;
    }
  },
  getCategory: async (id: string) => {
    try {
      return await api.get(`${endpoints.categories}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // News
  getNews: async () => {
    try {
      return await api.get(endpoints.news);
    } catch (error) {
      throw error;
    }
  },
  getNewsBySlug: async (slug: string) => {
    try {
      return await api.get(`${endpoints.news}/${slug}`);
    } catch (error) {
      throw error;
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
  instagram?: string;
  facebook?: string;
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
  _id: string;
  id?: string;
  name: string;
  category: string;
  icon?: string;
  proficiency: number;
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
  _id: string;
  id?: string;
  title: string;
  description: string;
  image?: string;
  eventAt: string;
  createdAt: string;
  updatedAt: string;
}

