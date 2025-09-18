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

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const { data: stats, isLoading, isError } = useFetchDashboardQuery();

  if (isLoading)
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#3b82f6" />
    );

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      change: stats.newProjectsThisMonth,
      changeLabel: "new this month",
      icon: <Ionicons name="folder-open" color="#22c55e" size={20} />,
      color: "#22c55e",
    },
    {
      title: "Total News",
      value: stats.totalNews,
      change: stats.newNewsThisMonth,
      changeLabel: "new this month",
      icon: <Ionicons name="newspaper" color="#eab308" size={20} />,
      color: "#eab308",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials,
      change: stats.newTestimonialsThisMonth,
      changeLabel: "new this month",
      icon: <Ionicons name="star" color="#ec4899" size={20} />,
      color: "#ec4899",
    },
    stats.totalVisitsThisMonth !== undefined && {
      title: "Total Visits",
      value: stats.totalVisitsThisMonth,
      change: 0,
      changeLabel: "this month",
      icon: <Ionicons name="analytics" color="#ef4444" size={20} />,
      color: "#ef4444",
    },
  ].filter(Boolean);

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
        data: stats.monthlyTrends.map((t) => t.value),
        color: () => "#3b82f6",
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
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
            icon={item.icon as any}
            color={item.color}
          />
        )}
        style={{ marginBottom: 20 }}
      />

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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                <Text style={{ fontWeight: "bold" }}>{item.user.name}</Text>{" "}
                {item.action}
              </Text>
              <Text style={styles.activityDate}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
