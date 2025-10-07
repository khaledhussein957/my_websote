import { StyleSheet, useColorScheme } from "react-native";


export default function useThemedStyles() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const background = isDark ? "#000" : "#fff";
  const text = isDark ? "#fff" : "#111";
  const subtext = isDark ? "#c7c7c7" : "#555";
  const border = isDark ? "#333" : "#e5e7eb";
  const inputBg = isDark ? "#111" : "#fff";
  const primary = "#2563eb";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      padding: 20,
      justifyContent: "center",
    },
    logo: {
      width: 120,
      height: 120,
      alignSelf: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: subtext,
      textAlign: "center",
      marginBottom: 30,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: border,
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: inputBg,
      fontSize: 16,
      color: text,
    },
    forgotContainer: {
      alignItems: "flex-end",
      marginBottom: 20,
    },
    forgotText: {
      color: primary,
      fontSize: 14,
      fontWeight: "500",
    },
    button: {
      backgroundColor: primary,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    link: {
      color: primary,
      fontSize: 14,
      textAlign: "center",
    },
  });
}