import { Stack} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AlertMessageProvider } from "@/components/AlerMessageController";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AlertMessageProvider />

        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
