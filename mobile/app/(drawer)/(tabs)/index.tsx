import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AlertMessage from "@/components/AlerMessageController";


export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Stats will appear here.</Text>

      <TouchableOpacity onPress={
        () => AlertMessage.success("cliked")
      }>
        click me
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});