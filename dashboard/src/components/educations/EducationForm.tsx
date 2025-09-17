import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle, Save, X } from "lucide-react";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Education,
  addEducation as createEducation,
  updateEducation,
  clearEducationError as clearError,
  clearEducationSuccess as clearSuccess,
} from "@/lib/slices/educationSlice";

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

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    startYear: "",
    endYear: "",
    gpa: "",
    uri: "",
  });

  // Initialize form data when editing
  useEffect(() => {
    if (education) {
      setFormData({
        institution: education.institution || "",
        degree: education.degree || "",
        startYear: education.startYear || "",
        endYear: education.endYear || "",
        gpa: education.gpa || "",
        uri: education.uri || "",
      });
    }
  }, [education]);

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

    if (!formData.institution || !formData.degree) return;

    dispatch(clearError());
    dispatch(clearSuccess());

    if (education) {
      dispatch(updateEducation({ id: education._id, data: formData }));
    } else {
      dispatch(createEducation(formData));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {education ? "Edit Education" : "Add Education"}
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
            {/* Institution */}
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium mb-1"
              >
                Institution Name *
              </label>
              <Input
                id="institution"
                name="institution"
                type="text"
                value={formData.institution}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Enter institution name"
              />
            </div>

            {/* Degree */}
            <div>
              <label
                htmlFor="degree"
                className="block text-sm font-medium mb-1"
              >
                Degree *
              </label>
              <textarea
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-vertical focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your degree"
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
                placeholder="e.g. 2018"
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
                placeholder="e.g. 2022"
              />
            </div>

            {/* GPA */}
            <div>
              <label htmlFor="gpa" className="block text-sm font-medium mb-1">
                GPA
              </label>
              <Input
                id="gpa"
                name="gpa"
                type="text"
                value={formData.gpa}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="e.g. 3.8"
              />
            </div>

            {/* URI */}
            <div>
              <label htmlFor="uri" className="block text-sm font-medium mb-1">
                Certificate / Document URL
              </label>
              <Input
                id="uri"
                name="uri"
                type="url"
                value={formData.uri}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="https://example.com/certificate.pdf"
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
                disabled={
                  isLoading || !formData.institution || !formData.degree
                }
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading
                  ? education
                    ? "Updating..."
                    : "Creating..."
                  : education
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
