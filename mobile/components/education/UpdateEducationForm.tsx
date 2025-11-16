import React, { useEffect } from "react";
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
import { updateEducation } from "@/validators/educationValidator";
import { z } from "zod";
import { createEducationStyles } from "@/assets/styles/educationForm.style";
import { useUpdateEducation } from "@/hooks/useEducation";

type UpdateFormData = z.infer<typeof updateEducation>;

interface UpdateEducationFormProps {
  educationData: Partial<UpdateFormData> & { id: string }; // require id for mutation
  onSuccess?: () => void; // optional callback after successful update
}

export default function UpdateEducationForm({
  educationData,
  onSuccess,
}: UpdateEducationFormProps) {
  const styles = createEducationStyles();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateEducation),
    defaultValues: {
      institution: "",
      degree: "",
      startYear: "",
      endYear: "",
      gpa: "",
      uri: "",
      ...educationData,
    },
  });

  useEffect(() => {
    reset(educationData);
  }, [educationData, reset]);

  const updateEducationMutation = useUpdateEducation();

  const onSubmit = (data: UpdateFormData) => {
    if (!educationData.id) return; // ensure id exists
    updateEducationMutation.mutate(
      { id: educationData.id, ...data }, // match your API: id + data
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      }
    );
  };

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
            <Text style={styles.headerTitle}>Update Education</Text>
            <Text style={styles.headerSubtitle}>Edit your education details</Text>
          </View>

          <View style={styles.formContainer}>
            {[
              { name: "institution", placeholder: "Institution" },
              { name: "degree", placeholder: "Degree" },
              { name: "startYear", placeholder: "Start Year (YYYY)", keyboardType: "numeric", maxLength: 4 },
              { name: "endYear", placeholder: "End Year (YYYY)", keyboardType: "numeric", maxLength: 4 },
              { name: "gpa", placeholder: "GPA (optional)" },
              { name: "uri", placeholder: "Website/URI (optional)", autoCapitalize: "none" },
            ].map((field) => (
              <View style={styles.inputContainer} key={field.name}>
                <Controller
                  control={control}
                  name={field.name as keyof UpdateFormData}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder={field.placeholder}
                      style={[
                        styles.textInput,
                        errors[field.name as keyof UpdateFormData] && styles.inputError,
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value as string}
                      keyboardType={field.keyboardType as any}
                      maxLength={field.maxLength}
                      autoCapitalize={field.autoCapitalize || "words"}
                    />
                  )}
                />
                {errors[field.name as keyof UpdateFormData] && (
                  <Text style={styles.errorText}>
                    {errors[field.name as keyof UpdateFormData]?.message}
                  </Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (isSubmitting || updateEducationMutation.isPending) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || updateEducationMutation.isPending}
            >
              <Text style={styles.buttonText}>
                {(isSubmitting || updateEducationMutation.isPending)
                  ? "Updating..."
                  : "Update Education"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
