import { View, Text, StyleSheet } from 'react-native';

export default function TestimonialsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testimonials</Text>
      <Text>CRUD UI goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});