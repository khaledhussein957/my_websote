import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import React from "react";

const NetworkErrorScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#111";
  const errorColor = "#ff3b30";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require("../assets/images/network_error.jpeg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: textColor }]}>Network Error</Text>
      <Text style={[styles.message, { color: errorColor }]}>Unable to connect. Please check your internet connection and try again.</Text>
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
