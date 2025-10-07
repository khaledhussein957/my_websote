import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Save, X } from "lucide-react";
import { Input } from "../ui/input";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Experience,
  addExperience as createExperience,
  updateExperience,
  clearExperienceError,
  clearExperienceSuccess,
} from "@/lib/slices/experienceSlice";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/validations/experience.validator";

type CreateExperienceData = z.infer<typeof createExperienceSchema>;
type UpdateExperienceData = z.infer<typeof updateExperienceSchema>;

interface ExperienceFormProps {
  experience?: Experience | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ExperienceForm({
  experience,
  onClose,
  onSuccess,
}: ExperienceFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector(
    (state) => state.experience
  );

  const isEditing = !!experience;

  // Select schema and type based on mode
  const schema = isEditing ? updateExperienceSchema : createExperienceSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExperienceData | UpdateExperienceData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  });

  // Set default values when editing
  useEffect(() => {
    if (experience) {
      reset({
        title: experience.title || "",
        company: experience.company || "",
        location: experience.location || "",
        startYear: experience.startYear?.toString() || "",
        endYear: experience.endYear?.toString() || "",
        description: experience.description || "",
      });
    }
  }, [experience, reset]);

  // Show toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearExperienceError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearExperienceSuccess());
      if (onSuccess) onSuccess();
    }
  }, [error, success, dispatch, onSuccess]);

  const onSubmit = (data: CreateExperienceData | UpdateExperienceData) => {
    // No conversion needed — they stay as strings
    if (isEditing && experience?._id) {
      dispatch(updateExperience({ id: experience._id, data }));
    } else {
      dispatch(createExperience(data));
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {isEditing ? "Edit Experience" : "Add Experience"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0.5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Title *
              </label>
              <Input {...register("title")} disabled={isLoading} />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Company *
              </label>
              <Input {...register("company")} disabled={isLoading} />
              {errors.company && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input {...register("location")} disabled={isLoading} />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Start Year */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Year
              </label>
              <Input {...register("startYear")} disabled={isLoading} />
              {errors.startYear && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.startYear.message}
                </p>
              )}
            </div>

            {/* End Year */}
            <div>
              <label className="block text-sm font-medium mb-1">End Year</label>
              <Input {...register("endYear")} disabled={isLoading} />
              {errors.endYear && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.endYear.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border rounded-md resize-vertical focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-t border-white rounded-full" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update" : "Create"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
