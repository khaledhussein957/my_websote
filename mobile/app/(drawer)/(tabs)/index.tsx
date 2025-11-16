import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AlertMessage from "@/components/AlerMessageController";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useCheckAuth } from "@/hooks/useAuth";
import NetInfo from "@react-native-community/netinfo";


export default function DashboardScreen() {
  const [networkError, setNetworkError] = useState(false);

  const { data: authData, isLoading } = useCheckAuth();

  // Monitor network
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setNetworkError(!state.isConnected);
    });
    return () => unsub();
  }, []);

  if (networkError) return <Redirect href="/networkError" />
  if (isLoading) return null;
  if (!authData) return <Redirect href="/(auth)/loginScreen" />
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Stats will appear here.</Text>

      <TouchableOpacity onPress={() => AlertMessage.success("cliked")}>
        <Text>clicked me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
});
