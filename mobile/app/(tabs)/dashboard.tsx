import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFetchDashboardQuery } from "../../lib/slices/Dashboard/dashboardApi";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import StatCard from "@/components/StatCard";
import { ActivityIndicator } from "react-native";

import { tokenUtils } from "../../lib/baseQuery";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const { data: stats, isLoading, isError } = useFetchDashboardQuery();

  if (isLoading)
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#3b82f6" />
    );

  if (!stats) return null;

  // get the user from tokenUtils
  const user = tokenUtils.getUser();

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      change: stats.newProjectsThisMonth,
      changeLabel: "new this month",
      iconName: "folder-open",
      iconColor: "#22c55e",
      color: "#22c55e",
    },
    {
      title: "Total News",
      value: stats.totalNews,
      change: stats.newNewsThisMonth,
      changeLabel: "new this month",
      iconName: "newspaper",
      iconColor: "#eab308",
      color: "#eab308",
    },
    {
      title: "Total TechStacks",
      value: stats.totalTechStacks,
      change: 0,
      changeLabel: "total",
      iconName: "layers",
      iconColor: "#38bdf8",
      color: "#38bdf8",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials,
      change: stats.newTestimonialsThisMonth,
      changeLabel: "new this month",
      iconName: "star",
      iconColor: "#ec4899",
      color: "#ec4899",
    },
    {
      title: "Total Visits",
      value: stats.totalVisitsThisMonth,
      change: 0,
      changeLabel: "this month",
      iconName: "analytics",
      iconColor: "#ef4444",
      color: "#ef4444",
    },
  ];

  // Pie chart data
  const pieData = [
    {
      name: "Projects",
      population: stats.totalProjects,
      color: "#22c55e",
      legendFontColor: "#000",
      legendFontSize: 14,
    },
    {
      name: "News",
      population: stats.totalNews,
      color: "#eab308",
      legendFontColor: "#000",
      legendFontSize: 14,
    },
    {
      name: "TechStacks",
      population: stats.totalTechStacks,
      color: "#38bdf8",
      legendFontColor: "#000",
      legendFontSize: 14,
    },
    {
      name: "Testimonials",
      population: stats.totalTestimonials,
      color: "#ec4899",
      legendFontColor: "#000",
      legendFontSize: 14,
    },
  ];

  const lineData = {
    labels: stats.monthlyTrends.map((t) => t.month),
    datasets: [
      {
        data: stats.monthlyTrends.map((t) => t.projects),
        color: () => "#22c55e",
        strokeWidth: 2,
      },
      {
        data: stats.monthlyTrends.map((t) => t.news),
        color: () => "#eab308",
        strokeWidth: 2,
      },
      {
        data: stats.monthlyTrends.map((t) => t.testimonials),
        color: () => "#ec4899",
        strokeWidth: 2,
      },
      {
        data: stats.monthlyTrends.map((t) => t.visits),
        color: () => "#ef4444",
        strokeWidth: 2,
      },
    ],
    legend: ["Projects", "News", "Testimonials", "Visits"],
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>Dashboard Overview</Text>
      <Text style={{ marginBottom: 16 }}>
        {`Welcome back, ${user?.name || "User"}! Here's what's happening with your portfolio.`}
      </Text>

      {/* Stat Cards */}
      <FlatList
        data={statCards}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <StatCard
            title={item.title}
            value={item.value}
            change={item.change}
            changeLabel={item.changeLabel}
            icon={<Ionicons name={item.iconName} color={item.iconColor} size={20} />}
            color={item.color}
          />
        )}
        style={{ marginBottom: 24 }}
        scrollEnabled={false}
      />

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Monthly Trends</Text>
      <LineChart
        data={lineData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.lineChart}
      />

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <FlatList
          data={stats.recentActivity}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : `activity-${index}`
          }
          renderItem={({ item, index }) => (
            <View
              style={styles.activityItem}
              key={item.id ? String(item.id) : `activity-${index}`}
            >
              <Text style={styles.activityText}>{item.message}</Text>
              <Text style={styles.activityDate}>
                {new Date(item.timeAgo).toLocaleString()}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      {/* Pie Chart */}
      <Text style={styles.chartTitle}>Categories Distribution</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  loading: { textAlign: "center", marginTop: 50 },
  error: { textAlign: "center", color: "red", marginTop: 50 },

  chartTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  lineChart: { borderRadius: 10 },

  activityContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  activityItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  activityText: { fontSize: 14 },
  activityDate: { fontSize: 12, color: "#6b7280" },
});
