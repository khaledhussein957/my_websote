import React, { useEffect, useState } from "react";
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
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAccount } from "@/validators/auth.validator";
import AlertMessageController from "@/components/AlerMessageController";
import { createAuthStyles } from "@/assets/styles/auth.style";
import { useRegister } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/colors";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const authStyles = createAuthStyles();
  const colors = useThemeColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerAccount),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const registerMutation = useRegister();

  useEffect(() => {
    if (errors.name) {
      AlertMessageController.error(errors.name.message || "Name is required");
    }
  }, [errors.name]);

  useEffect(() => {
    if (errors.phone) {
      AlertMessageController.error(errors.phone.message || "Phone is required");
    }
  }, [errors.phone]);

  useEffect(() => {
    if (errors.email) {
      AlertMessageController.error(errors.email.message || "Email is required");
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      AlertMessageController.error(
        errors.password.message || "Password is required"
      );
    }
  }, [errors.password]);

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
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
              source={require("../../assets/images/login.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={authStyles.title}>Create Account</Text>

          {/* Full Name */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.name && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.name.message || "Name is required"}
              </Text>
            )}
          </View>

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

          {/* Phone */}
          <View style={authStyles.inputContainer}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={authStyles.textInput}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  placeholder="Your phone number"
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.phone && (
              <Text style={{ color: colors.error, marginTop: 4, fontSize: 12 }}>
                {errors.phone.message || "Phone is required"}
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
                  placeholder="********"
                  placeholderTextColor="#999"
                />
              )}
            />

            {/* Show / Hide Password Button */}
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

          <TouchableOpacity
            style={[
              authStyles.authButton,
              registerMutation.isPending && authStyles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={registerMutation.isPending}
          >
            <Text style={authStyles.buttonText}>
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.linkContainer}>
            <Text style={authStyles.linkText}>Already have an account? </Text>
            <Pressable onPress={onLoginPress}>
              <Text style={authStyles.link}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
