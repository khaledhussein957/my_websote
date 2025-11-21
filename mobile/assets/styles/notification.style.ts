import { StyleSheet } from "react-native";
import { useThemeColors } from "@/constants/colors";

export const createNotificationStyles = () => {
  const colors = useThemeColors();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    markAllButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    markAllButtonText: {
      color: colors.background,
      fontSize: 14,
      fontWeight: "600",
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textLight,
      marginTop: 4,
    },
    listContent: {
      padding: 16,
    },
    notificationCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    unreadCard: {
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    notificationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    typeBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      alignSelf: "flex-start",
    },
    typeBadgeText: {
      fontSize: 11,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    notificationMessage: {
      fontSize: 14,
      color: colors.textLight,
      lineHeight: 20,
      marginBottom: 12,
    },
    notificationFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    readStatus: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    readStatusText: {
      fontSize: 12,
      color: colors.textLight,
    },
    markReadButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.border,
      borderRadius: 6,
    },
    markReadButtonText: {
      fontSize: 12,
      color: colors.text,
      fontWeight: "500",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textLight,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

// Type badge colors
export const getTypeBadgeColors = (type: string) => {
  switch (type) {
    case "success":
      return { bg: "#D4EDDA", text: "#155724" };
    case "error":
      return { bg: "#F8D7DA", text: "#721C24" };
    case "warning":
      return { bg: "#FFF3CD", text: "#856404" };
    case "info":
    default:
      return { bg: "#D1ECF1", text: "#0C5460" };
  }
};
