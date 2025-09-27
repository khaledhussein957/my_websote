import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerField({ value, onChange }) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {value ? (
        <Image source={{ uri: value }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  image: { width: 120, height: 90, borderRadius: 8, marginBottom: 8 },
  placeholder: { color: '#888', marginBottom: 8 },
  button: { backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
