import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginScreen" />
      <Stack.Screen name="forgotPasswordScreen" />
      <Stack.Screen name="resetPasswordScreen" />
    </Stack>
  );
};

export default AuthLayout;
