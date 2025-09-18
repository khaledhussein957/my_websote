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

import { useAppDispatch } from "../../lib/hooks";
import { useRouter } from "expo-router";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "../../validations/auth.validator";
import { useForgotPasswordMutation } from "../../lib/slices/Auth/authApi";
import { forgotPasswordSuccess } from "../../lib/slices/Auth/authSlice";

export default function ForgotPassword() {
  const styles = useThemedStyles(); // theme-aware styles

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // RTK Query mutation
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    setMessage("");
    try {
      const response = await forgotPassword(data).unwrap();
      dispatch(forgotPasswordSuccess(response.message));
      setIsError(false);
      setMessage("Password reset link sent to your email 📩");
    } catch (err: any) {
      console.error(err);
      setIsError(true);
      setMessage(err?.data?.message || "Something went wrong. Try again.");
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
