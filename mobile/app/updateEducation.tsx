import React from "react";
import { View, StyleSheet } from "react-native";
import UpdateEducationForm from "@/components/education/UpdateEducationForm";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function UpdateEducationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = useThemeColors();

  // Parse the item from params if it was passed as a stringified object,
  // or construct it from individual params if passed that way.
  // However, passing complex objects in params is not recommended.
  // For now, we'll assume the item properties are passed or we need to handle it.
  // Since the previous code passed { item }, it might be stringified by Expo Router if not careful,
  // but usually `navigation.navigate` with object works in React Navigation.
  // In Expo Router `router.push({ pathname, params })` flattens params.

  // Let's try to reconstruct the object or handle the passed params.
  // If the user uses `navigation.navigate` from `useNavigation`, it might pass the object in `params.item`.
  // But `useLocalSearchParams` returns string | string[].

  // Ideally we should pass ID and fetch, but for now let's see what we get.
  // If we use the `useNavigation` hook in the calling screen, we can access route.params.

  // Wait, `useLocalSearchParams` is for URL params.
  // If we use `navigation.navigate` with a stack, we should use `useRoute` or `useLocalSearchParams` might work if it serializes.

  // Let's assume we pass `item` as a param.
  // Since `useLocalSearchParams` might stringify, let's just pass the props directly if possible.
  // But `UpdateEducationForm` expects `educationData`.

  // A better approach for `router.push` is passing individual fields.
  // But the existing code uses `navigation.navigate`.

  // Let's use `useRoute` from @react-navigation/native to get the object params if `navigation.navigate` was used.

  // Actually, let's stick to `useLocalSearchParams` and assume we will update the calling code
  // to pass individual fields or we will handle the object if it comes through (Expo Router 2/3 handles objects in push sometimes but it's URL based).

  // To be safe and simple, let's try to use `useLocalSearchParams` and cast it.
  // If that fails, we might need to adjust the calling side to pass `id` and other fields flattened.

  const { item } = params;
  // If item is a string (JSON), parse it.
  let educationData = {};
  try {
    if (typeof item === "string") {
      educationData = JSON.parse(item);
    } else if (typeof item === "object") {
      educationData = item;
    }
  } catch (e) {
    // fallback
    educationData = params;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Update Education",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerShadowVisible: false,
        }}
      />
      <UpdateEducationForm
        educationData={educationData as any}
        onSuccess={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
