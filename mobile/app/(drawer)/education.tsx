import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import { useEducations, useDeleteEducation } from "@/hooks/useEducation";
import { educationStyles as styles } from "@/assets/styles/education.style";
import { Ionicons } from "@expo/vector-icons";

export default function EducationScreen() {
  const { data: educations, isLoading, isError } = useEducations();
  const deleteEducationMutation = useDeleteEducation();

  // Header configuration
  React.useLayoutEffect(() => {
    // Optional: You can customize header here if using a stack inside layout
  }, []);

  const getIconForDegree = (degree: string) => {
    switch (degree?.toLowerCase()) {
      case "bachelor":
        return "school";
      case "master":
        return "ribbon";
      case "phd":
        return "school-outline";
      default:
        return "document";
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this education?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteEducationMutation.mutate(id),
        },
      ]
    );
  };

  const renderEducationItem = ({ item }: { item: any }) => (
    <View style={styles.educationItem}>
      <Ionicons
        name={getIconForDegree(item.degree)}
        size={28}
        color="#007AFF"
        style={{ marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.educationTitle}>{item.institution}</Text>
        <Text style={styles.educationSubtitle}>{item.degree}</Text>
        <Text style={styles.educationYears}>
          {item.startYear} - {item.endYear || "Present"}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() =>
            router.push(
              `../../components/education/UpdateEducationForm?id=${item._id}`
            )
          }
          style={styles.iconButton}
        >
          <Ionicons name="pencil" size={22} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          style={styles.iconButton}
        >
          <Ionicons name="trash" size={22} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load educations.</Text>
        <TouchableOpacity onPress={() => {}} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "My Educations", // Set your header title
          headerShown: true,
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {educations?.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.noDataText}>No education records found.</Text>
        </View>
      ) : (
        <FlatList
          data={educations}
          keyExtractor={(item) => item._id}
          renderItem={renderEducationItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push("../../components/education/CreateEducationForm")
        }
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
