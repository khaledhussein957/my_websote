"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchDashboardStats } from "../../lib/slices/dashboardSlice";
import { fetchCategories } from "../../lib/slices/categorySlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderOpen,
  Newspaper,
  TrendingUp,
  Activity,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#ec4899",
  "#f97316",
  "#8b5cf6",
];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.dashboard);
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <CardTitle className="bg-gray-200 h-4 w-24 rounded"></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-8 w-16 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      change: stats.newProjectsThisMonth,
      changeLabel: "new this month",
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Total News",
      value: stats.totalNews,
      change: stats.newNewsThisMonth,
      changeLabel: "new this month",
      icon: Newspaper,
      color: "bg-yellow-500",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials,
      change: stats.newTestimonialsThisMonth,
      changeLabel: "new this month",
      icon: Star,
      color: "bg-pink-500",
    },
    stats.totalVisitsThisMonth !== undefined && {
      title: "Total Visits",
      value: stats.totalVisitsThisMonth,
      change: 0,
      changeLabel: "this month",
      icon: Activity,
      color: "bg-red-500",
    },
  ].filter(Boolean);

  // transform categories -> pie chart data
  const categoryData =
    categories?.map((cat: any) => ({
      category: cat.name,
      count: 1, // 👈 replace later with real project count per category
    })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, <strong>{user?.name}!</strong> Here&apos;s what&apos;s
          happening with your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat: any) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change > 0 ? "+" : ""}
                {stat.change} {stat.changeLabel}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Analytics Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  name="Users"
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#22c55e"
                  name="Projects"
                />
                <Line
                  type="monotone"
                  dataKey="news"
                  stroke="#eab308"
                  name="News"
                />
                {stats.monthlyTrends[0]?.testimonials !== undefined && (
                  <Line
                    type="monotone"
                    dataKey="testimonials"
                    stroke="#ec4899"
                    name="Testimonials"
                  />
                )}
                {stats.monthlyTrends[0]?.visits !== undefined && (
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#f43f5e"
                    name="Visits"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((act) => (
                <div key={act.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      act.type === "user"
                        ? "bg-green-500"
                        : act.type === "project"
                        ? "bg-blue-500"
                        : act.type === "news"
                        ? "bg-yellow-500"
                        : "bg-pink-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{act.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {act.timeAgo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent> */}
        </Card>
      </div>

      {/* bie chart for categories */}
      <div className="grid gap-6 md:grid-cols-1">
        {/* 📊 Pie chart for categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="h-5 w-5 mr-2" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
