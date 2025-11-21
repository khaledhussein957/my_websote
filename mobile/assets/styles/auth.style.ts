import { StyleSheet, Dimensions } from "react-native";
import { useThemeColors } from "@/constants/colors";

const { height } = Dimensions.get("window");

export const createAuthStyles = () => {
  const colors = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
    },
    imageContainer: {
      height: height * 0.3,
      marginBottom: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 320,
      height: 320,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textLight,
      textAlign: "center",
      marginBottom: 30,
    },
    formContainer: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 20,
      position: "relative",
    },
    textInput: {
      fontSize: 16,
      color: colors.text,
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    eyeButton: {
      position: "absolute",
      right: 16,
      top: 16,
      padding: 4,
    },
    authButton: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 30,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF", // White text for better contrast on amber button
      textAlign: "center",
    },
    linkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 20,
    },
    linkText: {
      fontSize: 16,
      color: colors.textLight,
    },
    link: {
      color: colors.primary,
      fontWeight: "600",
    },
  });
};

// For backward compatibility
export const authStyles = createAuthStyles();
