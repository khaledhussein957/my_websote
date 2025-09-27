import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const screens = [
  { name: 'Project', route: '../screens/ProjectScreen' },
  { name: 'TechStack', route: '../screens/TechStackScreen' },
  { name: 'Education', route: '../screens/EducationScreen' },
  { name: 'Experience', route: '../screens/ExperienceScreen' },
  { name: 'Category', route: '../screens/CategoryScreen' },
  { name: 'News', route: '../screens/NewsScreen' },
  { name: 'Testimonial', route: '../screens/TestimonialScreen' },
  { name: 'Settings', route: '../screens/SettingsScreen' },
];

const Profile = () => {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {screens.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          style={styles.button}
          onPress={() => router.push(screen.route)}
        >
          <Text style={styles.buttonText}>{screen.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default Profile;