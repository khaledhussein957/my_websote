import { View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import styles from "../../assets/styles/Profile.styles";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  title?: string;
  about_me?: string;
} | null;

export default function ProfileScreen() {
  const [user, setUser] = useState<StoredUser>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("auth_user");
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch {
        // ignore parse/storage errors
      }
    })();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View style={styles.header}>
        <Image
          source={
            user?.image ? (
              { uri: user.image }
            ) : (
              { uri: user?.name?.charAt(0) }
            )
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || "Your Name"}</Text>
        {!!user?.title && <Text style={styles.title}>{user.title}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "-"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phone || "-"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.about}>{user?.about_me || "No bio yet."}</Text>
      </View>
    </ScrollView>
  );
}
