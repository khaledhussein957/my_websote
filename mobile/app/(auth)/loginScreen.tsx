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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAccount } from "@/validators/auth.validator";
import AlertMessageController from "@/components/AlerMessageController";
import { authStyles } from "@/assets/styles/auth.style";
import { useLogin } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginAccount),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  useEffect(() => {
    if (errors.email) {
      AlertMessageController.error(errors.email.message || "Email is required");
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      AlertMessageController.error(errors.password.message || "Password is required");
    }
  }, [errors.password]);

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  const onRegisterPress = () => {
    router.push("/registerScreen");
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
          <Text style={authStyles.title}>Login</Text>

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
              <Text style={{ color: "red", marginTop: 4, fontSize: 12 }}>
                {errors.email.message || "Email is required"}
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
                  secureTextEntry
                  placeholder="********"
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red", marginTop: 4, fontSize: 12 }}>
                {errors.password.message || "Password is required"}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={authStyles.authButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loginMutation.isPending}
          >
            <Text style={authStyles.buttonText}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.linkContainer}>
            <Text style={authStyles.linkText}>Don't have an account? </Text>
            <Pressable onPress={onRegisterPress}>
              <Text style={authStyles.link}>Register</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}