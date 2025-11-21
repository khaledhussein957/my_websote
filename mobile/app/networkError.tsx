import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useThemeColors } from "@/constants/colors";

const NetworkErrorScreen = () => {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require("../assets/images/network-error.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: colors.error }]}>Network Error</Text>
      <Text style={[styles.message, { color: colors.text }]}>
        Unable to connect. Please check your internet connection and try again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default NetworkErrorScreen;
