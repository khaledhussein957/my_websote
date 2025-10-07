import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
