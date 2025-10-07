import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Index() {
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        setIsAuthed(!!token);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready || isAuthed === null) return null;

  return (
    <Redirect href={isAuthed ? '/(tabs)/dashboard' : '/(auth)/loginScreen'} />
  );
}
