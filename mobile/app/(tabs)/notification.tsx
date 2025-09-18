import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useFetchNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from "../../lib/slices/Notification/notificationApi";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useFetchNotificationsQuery();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();

  if (isLoading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#3b82f6" />
    );
  if (isError)
    return <Text style={styles.error}>Failed to load notifications</Text>;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead({ id }).unwrap();
    } catch (error) {
      Alert.alert("Error", "Failed to mark notification as read.");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead().unwrap();
    } catch (error) {
      Alert.alert("Error", "Failed to mark all notifications as read.");
    }
  };

  const renderItem = ({ item }: { item: (typeof notifications)[0] }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item.isRead ? styles.read : styles.unread,
      ]}
      onPress={() => handleMarkAsRead(item._id)}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        {!item.isRead && <Ionicons name="ellipse" size={12} color="#3b82f6" />}
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.markAllButton}
        onPress={handleMarkAllAsRead}
      >
        <Text style={styles.markAllText}>Mark All as Read</Text>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { textAlign: "center", marginTop: 50, color: "red" },

  markAllButton: {
    marginBottom: 10,
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  markAllText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  notificationItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  unread: { borderLeftWidth: 4, borderLeftColor: "#3b82f6" },
  read: { borderLeftWidth: 4, borderLeftColor: "#d1d5db" },

  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  notificationTitle: { fontSize: 16, fontWeight: "600" },
  notificationMessage: { fontSize: 14, color: "#4b5563", marginBottom: 5 },
  notificationDate: { fontSize: 12, color: "#9ca3af" },
});
