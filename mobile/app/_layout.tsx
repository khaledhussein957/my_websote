import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "react-redux";
import { tokenUtils } from "../lib/baseQuery";
import { store } from "../lib/store";

function AppContent() {
  const router = useRouter();
  const segments = useSegments();

  const [networkError, setNetworkError] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ Check auth using tokenUtils
  useEffect(() => {
    const checkAuth = async () => {
      await tokenUtils.initializeStoredData();
      const isLoggedIn = tokenUtils.isLoggedIn();

      setAuthChecked(true);

      if (isLoggedIn) {
        router.replace("/dashboard");
      } else {
        router.replace("/loginScreen");
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Live network monitoring
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkError(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Navigation control based on network
  useEffect(() => {
    if (!authChecked) return; // wait until tokenUtils completes

    if (networkError && segments[0] !== "networkError") {
      router.replace("/networkError");
    }
  }, [networkError, authChecked, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="networkError" />
      <Stack.Screen name="(auth)" />
      <StatusBar style="auto" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
