import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEducation } from "@/validators/educationValidator";
import { z } from "zod";
import { educationStyles as styles } from "@/assets/styles/educationForm.style";
import { useCreateEducation } from "@/hooks/useEducation";

type FormData = z.infer<typeof addEducation>;

export default function EducationForm() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(addEducation),
    defaultValues: {
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      gpa: "",
      uri: "",
    },
  });

  const createEducationMutation = useCreateEducation();

  const onSubmit = (data: FormData) => {
    createEducationMutation.mutate(data);
  };

  const fields: Array<{
    name: keyof FormData;
    placeholder: string;
    keyboardType?: "default" | "numeric";
    maxLength?: number;
    autoCapitalize?: "none" | "words" | "sentences" | "characters";
  }> = [
    { name: "institution", placeholder: "Institution" },
    { name: "degree", placeholder: "Degree" },
    { name: "startYear", placeholder: "Start Year (YYYY)", keyboardType: "numeric", maxLength: 4 },
    { name: "endYear", placeholder: "End Year (YYYY)", keyboardType: "numeric", maxLength: 4 },
    { name: "gpa", placeholder: "GPA (optional)" },
    { name: "uri", placeholder: "Website/URI (optional)", autoCapitalize: "none" },
  ];

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Add Education</Text>
            <Text style={styles.headerSubtitle}>Fill out your education details</Text>
          </View>

          <View style={styles.formContainer}>
            {fields.map((field) => (
              <View style={styles.inputContainer} key={field.name}>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder={field.placeholder}
                      style={[styles.textInput, errors[field.name] && styles.inputError]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value as string}
                      keyboardType={field.keyboardType as any}
                      maxLength={field.maxLength}
                      autoCapitalize={field.autoCapitalize || "words"}
                    />
                  )}
                />
                {errors[field.name] && (
                  <Text style={styles.errorText}>{errors[field.name]?.message}</Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (isSubmitting || createEducationMutation.isPending) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || createEducationMutation.isPending}
            >
              <Text style={styles.buttonText}>
                {(isSubmitting || createEducationMutation.isPending) ? "Submitting..." : "Add Education"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
