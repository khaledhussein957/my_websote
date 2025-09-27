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
import { createEducationSchema, updateEducationSchema } from "../validations/education.validator";

type EducationFormData = z.infer<typeof createEducationSchema>;

export default function EducationFormScreen() {
  const styles = useThemedStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      gpa: "",
      uri: "",
    },
  });

  const onSubmit = async (data: EducationFormData) => {
    try {
      setLoading(true);
      // 👇 Replace with API call
      console.log("Education Submitted:", data);

      Alert.alert("Success", "Education saved successfully!");
      reset(); // clear form
    } catch (err) {
      Alert.alert("Error", "Failed to save education");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Education</Text>
      <Text style={styles.subtitle}>Fill in your education details</Text>

      {/* Institution */}
      <Controller
        control={control}
        name="institution"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.institution && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Institution"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.institution && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.institution.message}
        </Text>
      )}

      {/* Degree */}
      <Controller
        control={control}
        name="degree"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.degree && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Degree"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.degree && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.degree.message}
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

      {/* GPA (optional) */}
      <Controller
        control={control}
        name="gpa"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="GPA (optional)"
            value={value}
            onChangeText={onChange}
            keyboardType="decimal-pad"
          />
        )}
      />

      {/* URI (optional) */}
      <Controller
        control={control}
        name="uri"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.uri && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Certificate/Transcript URL (optional)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.uri && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.uri.message}
        </Text>
      )}

      {/* Save Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Education</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
