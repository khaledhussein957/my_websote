import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFetchProjectsQuery } from "../../lib/slices/Project/projectApi";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProjectDetailsScreen() {
  const route = useRoute();
  // @ts-ignore
  const { projectId } = route.params || {};
  const { data, isLoading, isError } = useFetchProjectsQuery();
  const projects = data?.data || [];
  const project = projects.find((p) => p._id === projectId);
  const router = useRouter();

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (isError || !project) return <Text style={styles.error}>Project not found.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      {project.isFeatured && (
        <View style={styles.featuredRow}>
          <Ionicons name="star" color="#facc15" size={18} />
          <Text style={styles.featuredText}>Featured Project</Text>
        </View>
      )}
      <Text style={styles.desc}>{project.description}</Text>
      <Text style={styles.section}>Tech Stack:</Text>
      <View style={styles.techStack}>
        {project.techStack?.map((tech: { name: string }) => (
          <Text key={tech.name} style={styles.tech}>{tech.name}</Text>
        ))}
      </View>
      {project.githubUrl && (
        <Text style={styles.link}>GitHub: {project.githubUrl}</Text>
      )}
      {project.liveDemoUrl && (
        <Text style={styles.link}>Live Demo: {project.liveDemoUrl}</Text>
      )}
      {project.image && (
        <Text style={styles.link}>Image: {project.image}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  loading: { textAlign: "center", marginTop: 50 },
  error: { textAlign: "center", color: "red", marginTop: 50 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { marginRight: 10, padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2563eb' },
  title: { fontSize: 20, fontWeight: "bold", color: "#222", marginBottom: 8 },
  desc: { fontSize: 15, color: "#555", marginBottom: 12 },
  section: { fontWeight: "bold", marginTop: 10, marginBottom: 4 },
  techStack: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  tech: {
    backgroundColor: "#e0e7ef",
    color: "#2563eb",
    fontSize: 12,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  featuredRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  featuredText: { color: "#facc15", marginLeft: 4, fontWeight: "bold" },
  link: { color: "#2563eb", marginBottom: 6 },
});
