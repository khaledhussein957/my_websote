import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";

// Updated dashboard response type
interface MonthlyTrend {
    month: string;
    value: number;
}

interface RecentActivity {
    _id: string;
    action: string;
    user: {
        _id: string;
        name: string;
    };
    createdAt: string;
}

export interface DashboardData {
    totalProjects: number;
    totalNews: number;
    totalTechStacks: number;
    totalTestimonials: number;
    newProjectsThisMonth: number;
    newNewsThisMonth: number;
    newTestimonialsThisMonth: number;
    totalVisitsThisMonth: number;
    recentActivity: RecentActivity[];
    monthlyTrends: MonthlyTrend[];
    status: string;
}

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery,
    tagTypes: ["Dashboard"],
    endpoints: (builder) => ({
        fetchDashboard: builder.query<DashboardData, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useFetchDashboardQuery } = dashboardApi;
