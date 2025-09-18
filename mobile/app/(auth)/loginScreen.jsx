import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import useThemedStyles from "../../assets/styles/auth.style";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validations/auth.validator";

import { useAppDispatch } from "../../lib/hooks";
import { tokenUtils } from "../../lib/baseQuery";
import { useLoginMutation } from "../../lib/slices/Auth/authApi";
import { loginSuccess } from "../../lib/slices/Auth/authSlice";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const styles = useThemedStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      const result = await login(data).unwrap();

      // Store token and user
      if (result.token) {
        await tokenUtils.setToken(result.token);
        console.log("Token stored successfully");
      } else {
        console.warn("No token received from registration");
      }

      if (result.user) {
        await tokenUtils.setUser(result.user);
        console.log("User data stored successfully");
      } else {
        console.warn("No user data received from registration");
      }

      // Update Redux state
      dispatch(loginSuccess({
        user: result.user,
        token: result.token
      }));

      // Navigate to main app
      router.replace("/(tabs)");

    } catch (err) {
      setError(err.data?.message || "Login failed. Please try again.");
      Alert.alert("Login Error", err.data?.message || "Login failed. Please try again.");
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
          {errors.email.message}
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
                <Ionicons name="eye-outline" size="20" />
              ) : (
                <Ionicons name="eye-off-outline" size="20" />
              )}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.password.message}
        </Text>
      )}

      {/* Forgot Password Link */}
      <TouchableOpacity
        onPress={() => router.push("/forgotPasswordScreen")}
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
