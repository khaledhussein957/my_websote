import { useQuery } from "@tanstack/react-query";
import { dashboardApi, DashboardStatsData } from "@/api/dashboard";

export const useDashboardStats = () => {
  return useQuery<DashboardStatsData>({
    queryKey: ["dashboardStats"],
    queryFn: dashboardApi.DashboardStats,
    // Refetch every 5 minutes to keep dashboard data fresh
    refetchInterval: 5 * 60 * 1000,
    // Keep previous data while fetching new data for smooth UI
    placeholderData: (previousData) => previousData,
  });
};
