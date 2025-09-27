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

const newsSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  eventAt: z.string().min(4, "Event date is required"), // could later refine to a proper date
  slug: z.string().min(3, "Slug is required"),
  image: z.string().url("Invalid image URL").optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function NewsFormScreen() {
  const styles = useThemedStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      description: "",
      eventAt: "",
      slug: "",
      image: "",
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    try {
      setLoading(true);
      // 👇 Replace with your API call
      console.log("News Submitted:", data);

      Alert.alert("Success", "News article saved successfully!");
      reset();
    } catch (err) {
      Alert.alert("Error", "Failed to save news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add News</Text>
      <Text style={styles.subtitle}>Fill in news details</Text>

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
            placeholder="News Title"
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

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              { height: 100, textAlignVertical: "top" },
              errors.description && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="News Description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.description && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.description.message}
        </Text>
      )}

      {/* Event Date */}
      <Controller
        control={control}
        name="eventAt"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.eventAt && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Event Date (YYYY-MM-DD)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.eventAt && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.eventAt.message}
        </Text>
      )}

      {/* Slug */}
      <Controller
        control={control}
        name="slug"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.slug && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Slug (unique identifier)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.slug && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.slug.message}
        </Text>
      )}

      {/* Image */}
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.image && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Image URL (optional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.image && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.image.message}
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
          <Text style={styles.buttonText}>Save News</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
