import { useColorScheme } from "react-native";

export const lightTheme = {
  primary: "#f59e0b", // amber/orange accent
  background: "#FFFFFF",
  text: "#000000",
  border: "#E1E1E1",
  textLight: "#555555",
  card: "#FFFFFF",
  shadow: "#000000",
  success: "#4BB543",
  error: "#E74C3C",
};

export const darkTheme = {
  primary: "#f59e0b", // amber/orange accent
  background: "#000000",
  text: "#FFFFFF",
  border: "#1A1A1A",
  textLight: "#B3B3B3",
  card: "#0D0D0D",
  shadow: "#000000",
  success: "#4BB543", // green success
  error: "#E74C3C", // red error
};

export const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

export const useThemeColors = () => {
  const mode = useColorScheme(); // 'dark' | 'light'
  return mode === "dark" ? THEMES.dark : THEMES.light;
};
