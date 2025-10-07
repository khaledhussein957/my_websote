import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Save, X } from "lucide-react";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Education,
  addEducation as createEducation,
  updateEducation,
  clearEducationError as clearError,
  clearEducationSuccess as clearSuccess,
} from "@/lib/slices/educationSlice";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { addEducationSchema, updateEducationSchema } from "@/validations/education.validator";

type AddEducationData = z.infer<typeof addEducationSchema>;
type UpdateEducationData = z.infer<typeof updateEducationSchema>;

interface EducationFormProps {
  education?: Education | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EducationForm({
  education,
  onClose,
  onSuccess,
}: EducationFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector(
    (state) => state.education
  );

  // Select schema and type based on mode
  const isEditMode = Boolean(education);

  const schema = isEditMode ? updateEducationSchema : addEducationSchema;

  // UseForm setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      institution: education?.institution ?? "",
      degree: education?.degree ?? "",
      startYear: education?.startYear ?? "",
      endYear: education?.endYear ?? "",
      gpa: education?.gpa ?? "",
      uri: education?.uri ?? "",
    },
  });

  useEffect(() => {
    reset({
      institution: education?.institution ?? "",
      degree: education?.degree ?? "",
      startYear: education?.startYear ?? "",
      endYear: education?.endYear ?? "",
      gpa: education?.gpa ?? "",
      uri: education?.uri ?? "",
    });
  }, [education, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success, onSuccess]);

  // Submit handler
  const onSubmit = (data: AddEducationData | UpdateEducationData) => {
    dispatch(clearError());
    dispatch(clearSuccess());

    if (isEditMode && education) {
      dispatch(updateEducation({ id: education._id, data }));
    } else {
      dispatch(createEducation(data));
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {isEditMode ? "Edit Education" : "Add Education"}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0.5">
            {/* Institution */}
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium mb-1"
              >
                Institution Name {isEditMode ? "" : "*"}
              </label>
              <Input
                id="institution"
                {...register("institution")}
                disabled={isLoading}
                placeholder="Enter institution name"
                aria-invalid={errors.institution ? "true" : "false"}
              />
              {errors.institution && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.institution.message}
                </p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label
                htmlFor="degree"
                className="block text-sm font-medium mb-1"
              >
                Degree {isEditMode ? "" : "*"}
              </label>
              <textarea
                id="degree"
                {...register("degree")}
                disabled={isLoading}
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-vertical focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your degree"
                aria-invalid={errors.degree ? "true" : "false"}
              />
              {errors.degree && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.degree.message}
                </p>
              )}
            </div>

            {/* Start Year */}
            <div>
              <label
                htmlFor="startYear"
                className="block text-sm font-medium mb-1"
              >
                Start Year
              </label>
              <Input
                id="startYear"
                {...register("startYear")}
                disabled={isLoading}
                placeholder="e.g. 2018"
                aria-invalid={errors.startYear ? "true" : "false"}
              />
              {errors.startYear && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.startYear.message}
                </p>
              )}
            </div>

            {/* End Year */}
            <div>
              <label
                htmlFor="endYear"
                className="block text-sm font-medium mb-1"
              >
                End Year
              </label>
              <Input
                id="endYear"
                {...register("endYear")}
                disabled={isLoading}
                placeholder="e.g. 2022"
                aria-invalid={errors.endYear ? "true" : "false"}
              />
              {errors.endYear && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.endYear.message}
                </p>
              )}
            </div>

            {/* GPA */}
            <div>
              <label htmlFor="gpa" className="block text-sm font-medium mb-1">
                GPA
              </label>
              <Input
                id="gpa"
                {...register("gpa")}
                disabled={isLoading}
                placeholder="e.g. 3.8"
                aria-invalid={errors.gpa ? "true" : "false"}
              />
              {errors.gpa && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.gpa.message}
                </p>
              )}
            </div>

            {/* URI */}
            <div>
              <label htmlFor="uri" className="block text-sm font-medium mb-1">
                Certificate / Document URL
              </label>
              <Input
                id="uri"
                {...register("uri")}
                disabled={isLoading}
                placeholder="https://example.com/certificate.pdf"
                aria-invalid={errors.uri ? "true" : "false"}
              />
              {errors.uri && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.uri.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                {isLoading && <Spinner className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update"
                  : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
