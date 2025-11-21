import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNotifications,
  useMarkAllRead,
  useMarkRead,
} from "@/hooks/useNotification";
import {
  createNotificationStyles,
  getTypeBadgeColors,
} from "@/assets/styles/notification.style";
import { useThemeColors } from "@/constants/colors";
import { Notification } from "@/api/notification";

export default function NotificationsScreen() {
  const styles = createNotificationStyles();
  const colors = useThemeColors();

  const { data: notifications, isLoading, refetch } = useNotifications();
  const markAllRead = useMarkAllRead();
  const markRead = useMarkRead();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleMarkAllRead = () => {
    markAllRead.mutate();
  };

  const handleMarkRead = (notificationId: string) => {
    markRead.mutate(notificationId);
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const badgeColors = getTypeBadgeColors(item.type);

    return (
      <View
        style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      >
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <View style={[styles.typeBadge, { backgroundColor: badgeColors.bg }]}>
            <Text style={[styles.typeBadgeText, { color: badgeColors.text }]}>
              {item.type}
            </Text>
          </View>
        </View>

        <Text style={styles.notificationMessage}>{item.message}</Text>

        <View style={styles.notificationFooter}>
          <View style={styles.readStatus}>
            <Ionicons
              name={item.isRead ? "checkmark-circle" : "ellipse-outline"}
              size={16}
              color={item.isRead ? colors.success : colors.textLight}
            />
            <Text style={styles.readStatusText}>
              {item.isRead ? "Read" : "Unread"}
            </Text>
          </View>

          {!item.isRead && (
            <TouchableOpacity
              style={styles.markReadButton}
              onPress={() => handleMarkRead(item._id)}
              disabled={markRead.isPending}
            >
              <Text style={styles.markReadButtonText}>Mark as Read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notifications 🔔</Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={handleMarkAllRead}
              disabled={markAllRead.isPending}
            >
              <Text style={styles.markAllButtonText}>
                {markAllRead.isPending ? "Marking..." : "Mark All Read"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.headerSubtitle}>
          {unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "All caught up!"}
        </Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[
          styles.listContent,
          !notifications?.length && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={colors.textLight}
              style={styles.emptyIcon}
            />
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={colors.textLight}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No Notifications</Text>
            <Text style={styles.emptySubtext}>
              You're all caught up! Check back later.
            </Text>
          </View>
        }
      />
    </View>
  );
}
