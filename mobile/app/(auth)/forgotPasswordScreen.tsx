import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import useThemedStyles from "../../assets/styles/auth.style";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "expo-router";
import api from "../../src/lib/api";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "../../validations/auth.validator";

export default function ForgotPassword() {
  const styles = useThemedStyles();

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    setMessage("");
    try {
      setIsLoading(true);
      await api.post("/api/auth/forgot-password", data);
      setIsError(false);
      setMessage("Password reset link sent to your email 📩");
    } catch (err: any) {
      setIsError(true);
      setMessage(err?.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/forgot_password.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Forgot Password 🔑</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a password reset link
      </Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 6 }}>
          {errors.email.message}
        </Text>
      )}

      {/* Success/Error Message */}
      {message ? (
        <Text
          style={{
            textAlign: "center",
            color: isError ? "red" : "green",
            marginBottom: 10,
          }}
        >
          {message}
        </Text>
      ) : null}

      {/* Send Reset Link Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleForgotPassword)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.replace("/(auth)/loginScreen") }>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}