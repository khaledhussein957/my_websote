import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordAccount } from "@/validators/auth.validator";
import AlertMessageController from "@/components/AlerMessageController";
import { createAuthStyles } from "@/assets/styles/auth.style";
import { useForgotPassword } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useThemeColors } from "@/constants/colors";

export default function ForgotPasswordScreen() {
  const authStyles = createAuthStyles();
  const colors = useThemeColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordAccount),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useForgotPassword();

  useEffect(() => {
    if (errors.email) {
      AlertMessageController.error(errors.email.message || "Email is required");
    }
  }, [errors.email]);

  const onSubmit = (data: any) => {
    forgotPasswordMutation.mutate(data);
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
              source={require("../../assets/images/forgot-password.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={authStyles.title}>Forgot Password</Text>
          <Text style={authStyles.subtitle}>
            Enter your email address to receive a password reset code.
          </Text>

          {/* Email */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.email.message || "Email is required"}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              authStyles.authButton,
              forgotPasswordMutation.isPending && authStyles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={forgotPasswordMutation.isPending}
          >
            <Text style={authStyles.buttonText}>
              {forgotPasswordMutation.isPending
                ? "Sending reset code..."
                : "Send Reset Code"}
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
