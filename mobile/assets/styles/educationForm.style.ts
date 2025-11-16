import { StyleSheet } from "react-native";
import { useThemeColors } from "@/constants/colors";

export const createEducationStyles = () => {
  const colors = useThemeColors();
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
    },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    listContent: {
      paddingBottom: 100, // to avoid fab overlap
    },
    headerContainer: {
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textLight,
    },
    formContainer: {
      flex: 1,
    },
    educationItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    educationTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    educationSubtitle: {
      fontSize: 14,
      color: colors.textLight,
      marginTop: 4,
    },
    educationYears: {
      fontSize: 12,
      color: colors.textLight,
      marginTop: 2,
    },
    actionButtons: {
      flexDirection: "row",
      marginLeft: 12,
    },
    iconButton: {
      marginHorizontal: 6,
      padding: 6,
      borderRadius: 6,
      backgroundColor: colors.background, // light background behind icons
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
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      marginTop: 4,
      marginBottom: 12,
    },
    submitButton: {
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
      color: colors.text,
      textAlign: "center",
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
    },
    retryButtonText: {
      color: colors.primary,
      fontWeight: "600",
    },
    noDataText: {
      fontSize: 16,
      color: colors.textLight,
    },
    fab: {
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: colors.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },
  });
};

// Export a default instance for backward compatibility
// Note: This will use the theme at import time, which may not update dynamically
export const educationStyles = createEducationStyles();