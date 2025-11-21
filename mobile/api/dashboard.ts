import axiosInstance from "@/lib/axios";

export type DashboardStatsData = {
  totalProjects: number;
  totalNews: number;
  totalTechStacks: number;
  totalTestimonials: number;
  newProjectsThisMonth: number;
  newNewsThisMonth: number;
  newTestimonialThisMonth: number;
  totalVisitsThisMonth: number;
  recentActivity: Array<{
    id: any;
    type: string;
    message: string;
    timeAgo: string | null;
  }>;
  monthlyTrends: Array<{
    month: string;
    projects: number;
    news: number;
    testimonials: number;
    visits: number;
  }>;
  status: string;
};

export const dashboardApi = {
  DashboardStats: async (): Promise<DashboardStatsData> => {
    const response = await axiosInstance.get(`/dashboard/stats`);
    return response.data;
  },
};
