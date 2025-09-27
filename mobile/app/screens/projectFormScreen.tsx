import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectSchema,
  ProjectFormData,
} from "../../validations/project.validator";
import { useFetchTechStacksQuery } from "../../lib/slices/TechStack/techStackApi";
import ImagePickerField from "./ImagePickerField";
import { useRouter } from "expo-router";

export default function ProjectFormScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: techStackData, isLoading: techLoading } =
    useFetchTechStacksQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      githubUrl: "",
      liveDemoUrl: "",
      techStack: [],
      isFeatured: false,
      image: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);
      // 👇 Replace with your API call
      console.log("Project Submitted:", data);
      Alert.alert("Success", "Project saved successfully!");
      reset();
      router.back();
    } catch (err) {
      Alert.alert("Error", "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Project</Text>
      <Text style={styles.subtitle}>Fill in your project details</Text>

      {/* Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Project Title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            placeholder="Project Description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description.message}</Text>
      )}

      {/* GitHub URL */}
      <Controller
        control={control}
        name="githubUrl"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.githubUrl && styles.inputError]}
            placeholder="GitHub URL (optional)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.githubUrl && (
        <Text style={styles.errorText}>{errors.githubUrl.message}</Text>
      )}

      {/* Live Demo URL */}
      <Controller
        control={control}
        name="liveDemoUrl"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.liveDemoUrl && styles.inputError]}
            placeholder="Live Demo URL (optional)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.liveDemoUrl && (
        <Text style={styles.errorText}>{errors.liveDemoUrl.message}</Text>
      )}

      {/* Tech Stack Selection */}
      <Text style={styles.sectionTitle}>Tech Stack</Text>
      {techLoading ? (
        <Text>Loading tech stacks...</Text>
      ) : (
        <Controller
          control={control}
          name="techStack"
          render={({ field: { value, onChange } }) => (
            <View style={{ width: "100%" }}>
              {/* Container to hold tech stack rows */}
              <View style={styles.techStackContainer}>
                {/* Map through tech stacks */}
                {(Array.isArray(techStackData?.data)
                  ? techStackData.data
                  : []
                ).map((tech) => {
                  const selected = value?.some((t) => t.name === tech.name);
                  return (
                    <TouchableOpacity
                      key={tech._id}
                      style={[
                        styles.techStackRow,
                        selected && { borderColor: "#2563eb", borderWidth: 2 },
                      ]}
                      onPress={() => {
                        if (selected) {
                          onChange(value.filter((t) => t.name !== tech.name));
                        } else {
                          onChange([
                            ...value,
                            {
                              name: tech.name,
                              category: tech.category,
                              proficiency: tech.proficiency,
                              icon: tech.icon,
                            },
                          ]);
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "600",
                          color: selected ? "#2563eb" : "#222",
                        }}
                      >
                        {tech.name} {/* Display the tech stack name */}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.techStack && (
                <Text style={styles.errorText}>{errors.techStack.message}</Text>
              )}
            </View>
          )}
        />
      )}

      {/* Featured Switch */}
      <Controller
        control={control}
        name="isFeatured"
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchRow}>
            <Switch value={value} onValueChange={onChange} />
            <Text style={styles.switchLabel}>Featured Project</Text>
          </View>
        )}
      />

      {/* Image Picker */}
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value } }) => (
          <ImagePickerField value={value} onChange={onChange} />
        )}
      />
      {errors.image && (
        <Text style={styles.errorText}>{errors.image.message}</Text>
      )}

      {/* Save & Cancel Buttons */}
      <View
        style={{
          flexDirection: "row",
          width: 320,
          maxWidth: "100%",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <TouchableOpacity
          style={[styles.saveBtn, { flex: 1, marginRight: 8 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Save Project</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveBtn, { flex: 1, backgroundColor: "#ef4444" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.saveBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: 320,
    maxWidth: "100%",
  },
  inputError: { borderColor: "red", borderWidth: 1 },
  errorText: { color: "red", marginBottom: 6, alignSelf: "flex-start" },
  textArea: { height: 100, textAlignVertical: "top" },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    alignSelf: "flex-start",
  },

  // New: Style for tech stack container
  techStackContainer: {
    flexDirection: "row", // Make items display horizontally
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "space-between", // Distribute items evenly
    width: "100%", // Full width of the container
  },

  // New: Update the tech stack item style
  techStackRow: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: "30%", // Set width to 30% to allow 3 items per row
    alignItems: "center",
    justifyContent: "center",
  },

  removeBtn: {
    backgroundColor: "red",
    borderRadius: 6,
    paddingVertical: 6,
    marginTop: 8,
    alignItems: "center",
  },
  removeBtnText: { color: "#fff", fontWeight: "600" },
  addBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: "center",
    width: 320,
    maxWidth: "100%",
  },
  addBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  switchLabel: { marginLeft: 8, fontSize: 15 },
  saveBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    width: 320,
    maxWidth: "100%",
  },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
