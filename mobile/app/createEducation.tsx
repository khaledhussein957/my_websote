import React from "react";
import { View, StyleSheet } from "react-native";
import EducationForm from "@/components/education/CreateEducationForm";
import { Stack, useRouter } from "expo-router";
import { useThemeColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function CreateEducationScreen() {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add Education",
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
      <EducationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
