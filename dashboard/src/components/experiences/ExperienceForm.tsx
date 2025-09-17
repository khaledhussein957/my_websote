import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle, Save, X } from "lucide-react";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Experience,
  addExperience as createExperience,
  updateExperience,
  clearExperienceError as clearError,
  clearExperienceSuccess as clearSuccess,
} from "@/lib/slices/experienceSlice";

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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    startYear: "",
    endYear: "",
    location: "",
  });

  // Initialize form data when editing
  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title || "",
        description: experience.description || "",
        company: experience.company || "",
        startYear: experience.startYear || "",
        endYear: experience.endYear || "",
        location: experience.location || "",
      });
    }
  }, [experience]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  // Handle success
  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success, onSuccess]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.company) return;

    dispatch(clearError());
    dispatch(clearSuccess());

    if (experience) {
      dispatch(updateExperience({ id: experience._id, data: formData }));
    } else {
      dispatch(createExperience(formData));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {experience ? "Edit Experience" : "Add Experience"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Error and Success Messages */}
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                <div className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 mb-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                <div className="text-sm text-green-700 dark:text-green-400">
                  {success}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Job Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g. Software Engineer"
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-1"
              >
                Company *
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g. Google"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Location
              </label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="e.g. New York, USA"
              />
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
                name="startYear"
                type="text"
                value={formData.startYear}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="e.g. 2020"
              />
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
                name="endYear"
                type="text"
                value={formData.endYear}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="e.g. 2023 or Present"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={4}
                className="w-full px-3 py-2 border rounded-md resize-vertical focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your role, responsibilities, and achievements"
              />
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
                disabled={isLoading || !formData.title || !formData.company}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading
                  ? experience
                    ? "Updating..."
                    : "Creating..."
                  : experience
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
