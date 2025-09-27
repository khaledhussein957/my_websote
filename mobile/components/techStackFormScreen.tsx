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

// ✅ Validation Schema
const techStackSchema = z.object({
  name: z.string().min(2, "Technology name is required"),
  icon: z.string().url("Must be a valid URL").optional(),
  category: z.string().min(2, "Category is required"),
  proficiency: z
    .preprocess((val) => Number(val), z.number().min(1).max(10))
    .refine((val) => val >= 1 && val <= 10, {
      message: "Proficiency must be between 1 and 10",
    }),
});

type TechStackFormData = z.infer<typeof techStackSchema>;

export default function TechStackFormScreen() {
  const styles = useThemedStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TechStackFormData>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: "",
      icon: "",
      category: "",
      proficiency: 1,
    },
  });

  const onSubmit = async (data: TechStackFormData) => {
    try {
      setLoading(true);
      // 👇 Replace with API call
      console.log("Tech Stack Submitted:", data);

      Alert.alert("Success", "Tech stack saved successfully!");
      reset();
    } catch (err) {
      Alert.alert("Error", "Failed to save tech stack");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Tech Stack</Text>
      <Text style={styles.subtitle}>Fill in your technology details</Text>

      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.name && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Technology Name (e.g. React, Node.js)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.name.message}
        </Text>
      )}

      {/* Icon (optional) */}
      <Controller
        control={control}
        name="icon"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.icon && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Icon URL (optional)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.icon && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.icon.message}
        </Text>
      )}

      {/* Category */}
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.category && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Category (e.g. Frontend, Backend, Database)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.category && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.category.message}
        </Text>
      )}

      {/* Proficiency (1-10) */}
      <Controller
        control={control}
        name="proficiency"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.proficiency && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Proficiency (1-10)"
            value={String(value)}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.proficiency && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.proficiency.message}
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
          <Text style={styles.buttonText}>Save Tech Stack</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
