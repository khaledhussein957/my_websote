import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemedStyles from "../../assets/styles/auth.style";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validations/auth.validator";

import { useAppDispatch } from "../../src/hooks/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../src/lib/api";
import { setCredentials } from "../../src/store/slices/authSlice";
import { useRouter } from "expo-router";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const styles = useThemedStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null);
      setLoginLoading(true);
      const res = await api.post("/api/auth/login", data);
      const result = res.data;

      if (result?.token) {
        await AsyncStorage.setItem("auth_token", result.token);
      }
      if (result?.user) {
        await AsyncStorage.setItem("auth_user", JSON.stringify(result.user));
      }

      if (result?.user && result?.token) {
        dispatch(setCredentials({ user: result.user, token: result.token }));
      }

      router.replace("/(tabs)/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      Alert.alert("Login Error", msg);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your portfolio dashboard</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.email.message as string}
        </Text>
      )}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((s) => !s)}
              style={{ position: "absolute", right: 12, top: 14 }}
            >
              <Text style={{ color: "#2563eb" }}>{showPassword ? (
                <Ionicons name="eye-outline" size={20} />
              ) : (
                <Ionicons name="eye-off-outline" size={20} />
              )}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.password.message as string}
        </Text>
      )}

      {/* Forgot Password Link */}
      <TouchableOpacity
        onPress={() => router.push("/(auth)/forgotPasswordScreen")}
        style={styles.forgotContainer}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loginLoading}
      >
        {loginLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}