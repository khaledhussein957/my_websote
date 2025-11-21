import { StyleSheet } from "react-native";
import { useThemeColors } from "@/constants/colors";

export const createEducationStyles = () => {
  const COLORS = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    listContent: {
      paddingBottom: 100, // to avoid fab overlap
    },
    educationItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
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
      color: COLORS.text,
    },
    educationSubtitle: {
      fontSize: 14,
      color: COLORS.textLight,
      marginTop: 4,
    },
    educationYears: {
      fontSize: 12,
      color: COLORS.textLight,
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
      backgroundColor: COLORS.background, // light background behind icons
    },
    errorText: {
      fontSize: 16,
      color: COLORS.error,
      marginBottom: 12,
    },
    retryButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
    },
    retryButtonText: {
      color: COLORS.background,
      fontWeight: "600",
    },
    noDataText: {
      fontSize: 16,
      color: COLORS.textLight,
    },
    fab: {
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: COLORS.primary,
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
