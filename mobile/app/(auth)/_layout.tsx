import { Redirect, Stack } from "expo-router";
import { useCheckAuth } from "@/hooks/useAuth";

const AuthLayout = () => {
  const { data: authData } = useCheckAuth();

  if (authData) return <Redirect href={"/(drawer)/(tabs)"} />;
  
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
