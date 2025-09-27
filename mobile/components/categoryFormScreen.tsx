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
import { useState } from "react";
import { createCategorySchema } from "../validations/category.validator";
import useThemedStyles from "../assets/styles/auth.style";

export default function CategoryFormScreen() {
  const styles = useThemedStyles();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // 👇 Replace with API call to save category
      console.log("Category Submitted:", data);

      Alert.alert("Success", "Category saved successfully!");
      reset(); // clear form
    } catch (err) {
      Alert.alert("Error", "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Category</Text>
      <Text style={styles.subtitle}>Add a new category for your portfolio</Text>

      {/* Category Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.name && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Category Name"
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

      {/* Category Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              { height: 100, textAlignVertical: "top" }, // multiline style
              errors.description && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Description"
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

      {/* Save Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Category</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
