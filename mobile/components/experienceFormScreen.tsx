import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import useThemedStyles from "../assets/styles/auth.style";
import { createExperienceSchema as experienceSchema } from "../validations/experiance.validator";


export default function ExperienceFormScreen() {
  const styles = useThemedStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      description: "",
      company: "",
      startYear: "",
      endYear: "",
      location: "",
    },
  });

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      setLoading(true);
      // 👇 Replace with API call
      console.log("Experience Submitted:", data);

      Alert.alert("Success", "Experience saved successfully!");
      reset();
    } catch (err) {
      Alert.alert("Error", "Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Experience</Text>
      <Text style={styles.subtitle}>Fill in your work experience details</Text>

      {/* Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.title && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Job Title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.title.message}
        </Text>
      )}

      {/* Company */}
      <Controller
        control={control}
        name="company"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.company && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Company"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.company && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.company.message}
        </Text>
      )}

      {/* Location */}
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.location && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Location"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.location && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.location.message}
        </Text>
      )}

      {/* Start Year */}
      <Controller
        control={control}
        name="startYear"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.startYear && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Start Year (e.g. 2020)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.startYear && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.startYear.message}
        </Text>
      )}

      {/* End Year */}
      <Controller
        control={control}
        name="endYear"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.endYear && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="End Year (e.g. 2024)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.endYear && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.endYear.message}
        </Text>
      )}

      {/* Description (optional) */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Description (optional)"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Experience</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
