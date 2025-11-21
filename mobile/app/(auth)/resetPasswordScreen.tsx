import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordAccount } from "@/validators/auth.validator";
import AlertMessageController from "@/components/AlerMessageController";
import { createAuthStyles } from "@/assets/styles/auth.style";
import { useResetPassword, useResendResetCode } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/colors";
import { Image } from "react-native";

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authStyles = createAuthStyles();
  const colors = useThemeColors();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordAccount),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useResetPassword();
  const resendCodeMutation = useResendResetCode();

  const onSubmit = (data: any) => {
    resetPasswordMutation.mutate(data);
  };

  const onResendCode = () => {
    // We only have email in forgot password screen,
    // Ideally, you'd pass email here via navigation params or global state
    // For demo, prompt user or hardcode email or pass as prop
    // Here just a placeholder email for example:
    const email = "user@example.com"; // replace or get from context/params

    resendCodeMutation.mutate({ email });
  };

  const onLoginPress = () => {
    router.push("/loginScreen");
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/reset-password.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={authStyles.title}>Reset Password</Text>
          <Text style={authStyles.subtitle}>
            Enter the reset code sent to your email and set a new password.
          </Text>

          {/* Code */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="code"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Reset code"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.code && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.code.message || "Code is required"}
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  placeholder="New password"
                  placeholderTextColor="#999"
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={authStyles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
            {errors.password && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.password.message || "Password is required"}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="#999"
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={authStyles.eyeButton}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
            {errors.confirmPassword && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.confirmPassword.message ||
                  "Confirm password is required"}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              authStyles.authButton,
              resetPasswordMutation.isPending && authStyles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={resetPasswordMutation.isPending}
          >
            <Text style={authStyles.buttonText}>
              {resetPasswordMutation.isPending
                ? "Resetting..."
                : "Reset Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              authStyles.authButton,
              { backgroundColor: colors.border, marginTop: 12 },
              resendCodeMutation.isPending && authStyles.buttonDisabled,
            ]}
            onPress={onResendCode}
            disabled={resendCodeMutation.isPending}
          >
            <Text style={[authStyles.buttonText, { color: colors.text }]}>
              {resendCodeMutation.isPending ? "Resending..." : "Resend Code"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.linkContainer}>
            <Text style={authStyles.linkText}>Remembered your password? </Text>
            <Pressable onPress={onLoginPress}>
              <Text style={authStyles.link}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
