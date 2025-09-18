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

import {
  ResetPasswordForm,
  resetPasswordSchema,
} from "../../validations/auth.validator";
import { useAppDispatch } from "../../lib/hooks";
import { useResetPasswordMutation } from "../../lib/slices/Auth/authApi";
import { resetPasswordSuccess } from "../../lib/slices/Auth/authSlice";

import { useRouter } from "expo-router";

export default function ResetPassword() {
  const styles = useThemedStyles(); // theme-aware styles

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  // RTK Query mutation
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (data: ResetPasswordForm) => {
    setMessage("");
    try {
      const response = await resetPassword({ token: data.code, password: data.password }).unwrap();
      dispatch(resetPasswordSuccess(response.message));
      setMessage("Password reset successful ✅");
      router.replace("/(auth)/loginScreen");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/reset_password.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Reset Password 🔑</Text>
      <Text style={styles.subtitle}>
        Enter the code from your email and set a new password
      </Text>

      {/* Reset Code */}
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Reset Code"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
          />
        )}
      />
      {errors.code && <Text style={{ color: "red", marginBottom: 6 }}>{errors.code.message}</Text>}

      {/* New Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((s) => !s)}
              style={{ position: "absolute", right: 12, top: 14 }}
            >
              <Text style={{ color: "#2563eb" }}>{showPassword ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={{ color: "red", marginBottom: 6 }}>{errors.password.message}</Text>}

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm((s) => !s)}
              style={{ position: "absolute", right: 12, top: 14 }}
            >
              <Text style={{ color: "#2563eb" }}>{showConfirm ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.confirmPassword && <Text style={{ color: "red", marginBottom: 6 }}>{errors.confirmPassword.message}</Text>}

      {/* Success/Error Message */}
      {message ? (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          {message}
        </Text>
      ) : null}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleResetPassword)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.replace("/(auth)/loginScreen")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
