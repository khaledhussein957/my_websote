import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { useFetchProjectsQuery, useDeleteProjectMutation } from "../../lib/slices/Project/projectApi";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProjectScreen() {
  const { data, isLoading, isError } = useFetchProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const projects = data?.data || [];
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterFeatured) {
      filtered = filtered.filter((p) => p.isFeatured);
    }
    return filtered;
  }, [projects, search, filterFeatured]);

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Project", "Are you sure you want to delete this project?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProject(id).unwrap();
            Alert.alert("Deleted", "Project deleted successfully");
          } catch {
            Alert.alert("Error", "Failed to delete project");
          }
        },
      },
    ]);
  };

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (isError) return <Text style={styles.error}>Failed to load projects.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Projects Management</Text>
      <Text style={styles.subtitle}>Create and manage your projects</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[styles.filterBtn, filterFeatured && { backgroundColor: '#2563eb' }]}
          onPress={() => setFilterFeatured((v) => !v)}
        >
          <Ionicons name="star" color={filterFeatured ? '#fff' : '#2563eb'} size={18} />
          <Text style={[styles.filterText, filterFeatured && { color: '#fff' }]}>Featured</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/screens/projectFormScreen')}
        >
          <Ionicons name="add-circle" color="#22c55e" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>No projects found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{item.title}</Text>
              {item.isFeatured && <Ionicons name="star" color="#facc15" size={18} style={{ marginLeft: 8 }} />}
            </View>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.techStack}>
              {item.techStack?.map((tech: { name: string }) => (
                <Text key={tech.name} style={styles.tech}>{tech.name}</Text>
              ))}
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => router.push({ pathname: '/screens/ProjectDetailsScreen', params: { projectId: item._id } })}>
                <Ionicons name="eye" color="#2563eb" size={20} />
                <Text style={styles.actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => router.push({ pathname: '/screens/projectFormScreen', params: { project: JSON.stringify(item) } })}>
                <Ionicons name="create" color="#eab308" size={20} />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item._id)}>
                <Ionicons name="trash" color="#ef4444" size={20} />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  loading: { textAlign: "center", marginTop: 50 },
  error: { textAlign: "center", color: "red", marginTop: 50 },
  empty: { textAlign: "center", marginTop: 50, color: "#888" },
  pageTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: '#222' },
  subtitle: { fontSize: 15, color: '#555', marginBottom: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  searchInput: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 8, paddingHorizontal: 12, height: 40, marginRight: 8 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#2563eb', borderRadius: 8, paddingHorizontal: 10, height: 40, marginRight: 8, backgroundColor: '#fff' },
  filterText: { color: '#2563eb', marginLeft: 4, fontWeight: '600' },
  addBtn: { backgroundColor: '#e0fce7', borderRadius: 8, padding: 6 },
  card: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
  actionText: { marginLeft: 4, fontWeight: '600', color: '#2563eb' },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  title: { fontSize: 16, fontWeight: "bold", color: "#222" },
  desc: { fontSize: 14, color: "#555", marginBottom: 8 },
  techStack: { flexDirection: "row", flexWrap: "wrap" },
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
});
