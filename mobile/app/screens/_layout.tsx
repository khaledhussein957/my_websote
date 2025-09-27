import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ScreensLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: true }} />
      <StatusBar style="auto" />
    </>
  );
}
