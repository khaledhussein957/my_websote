"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createProject,
  updateProject,
  clearError,
  clearSuccess,
} from "@/lib/slices/projectSlice";
import { fetchTechStacks } from "@/lib/slices/techstackSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Save, ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/slices/projectSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createProjectSchema,
  updateProjectSchema,
} from "@/validations/project.validator";
import { z } from "zod";

// You’ll need a Spinner component or substitute your own
import { Spinner } from "@/components/ui/spinner";

/** Choose schema dynamically */
const getSchema = (isEdit: boolean) =>
  isEdit ? updateProjectSchema : createProjectSchema;

type CreateProjectData = z.infer<typeof createProjectSchema>;
type UpdateProjectData = z.infer<typeof updateProjectSchema>;

type ProjectFormFields = {
  title: string;
  description: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  type: "mobile" | "fullstack" | "frontend" | "backend" | "machine";
  techStack: string[];
  image?: FileList | string;
  featured?: boolean;
};

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ProjectForm({
  project,
  onClose,
  onSuccess,
}: ProjectFormProps) {
  const dispatch = useAppDispatch();
  const { isCreating, isUpdating, error, success } = useAppSelector(
    (state) => state.project
  );
  const { techStacks } = useAppSelector((state) => state.techstack);

  const isEdit = Boolean(project);
  const isLoading = isCreating || isUpdating;

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormFields>({
    resolver: zodResolver(getSchema(isEdit)),
    defaultValues: {
      title: "",
      description: "",
      githubUrl: "",
      liveDemoUrl: "",
      type: "" as any,
      techStack: [],
      image: undefined,
      // if your schemas include `featured`, etc., include defaultValues here
    },
  });

  // Fetch tech stacks initially
  useEffect(() => {
    dispatch(fetchTechStacks());
  }, [dispatch]);

  // When project is provided (edit mode), reset form with its data
  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        githubUrl: project.githubUrl ?? "",
        liveDemoUrl: project.liveDemoUrl ?? "",
        type: project.type as any,
        techStack: project.techStack.map((t) => t._id),
        image: undefined,
        // if there are additional fields, e.g. featured, set them here
      });
    }
  }, [project, reset]);

  // Watch the image field (to build preview)
  const watchedImage = watch("image");
  let imagePreviewUrl: string | null = null;
  if (
    watchedImage &&
    watchedImage instanceof FileList &&
    watchedImage.length > 0
  ) {
    imagePreviewUrl = URL.createObjectURL(watchedImage[0]);
  } else if (project && project.image) {
    imagePreviewUrl = project.image;
  }

  // Show toasts on error / success
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Operation successful");
      dispatch(clearSuccess());
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [error, success, dispatch, onSuccess]);

  const onSubmit = (data: ProjectFormFields) => {
    // Build payload
    const payload: any = {
      title: data.title,
      description: data.description,
      githubUrl: data.githubUrl || undefined,
      liveDemoUrl: data.liveDemoUrl || undefined,
      type: data.type,
      techStack: data.techStack,
      // include other fields (e.g. featured) if your schema has them
    };
    if (data.image && data.image.length > 0) {
      payload.image = data.image[0]; // take the File from FileList
    }

    if (isEdit && project) {
      dispatch(updateProject({ id: project._id, projectData: payload }));
    } else {
      dispatch(createProject(payload));
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            {isEdit ? "Edit Project" : "Create New Project"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Project Title *
              </label>
              <Input
                id="title"
                {...register("title")}
                disabled={isLoading}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                {...register("description")}
                disabled={isLoading}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Describe your project..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="githubUrl" className="block text-sm mb-1">
                  <Github className="h-4 w-4 inline mr-1" />
                  GitHub URL
                </label>
                <Input
                  id="githubUrl"
                  {...register("githubUrl")}
                  disabled={isLoading}
                  placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.githubUrl.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="liveDemoUrl" className="block text-sm mb-1">
                  <ExternalLink className="h-4 w-4 inline mr-1" />
                  Live Demo URL
                </label>
                <Input
                  id="liveDemoUrl"
                  {...register("liveDemoUrl")}
                  disabled={isLoading}
                  placeholder="https://your-project.com"
                />
                {errors.liveDemoUrl && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.liveDemoUrl.message}
                  </p>
                )}
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Project Type *
              </label>
              <select
                id="type"
                {...register("type")}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="" disabled>
                  Select type
                </option>
                {["mobile", "fullstack", "frontend", "backend", "machine"].map(
                  (tp) => (
                    <option key={tp} value={tp}>
                      {tp.charAt(0).toUpperCase() + tp.slice(1)}
                    </option>
                  )
                )}
              </select>
              {errors.type && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tech Stack * (Select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {techStacks.map((tech) => (
                  <label
                    key={tech._id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={tech._id}
                      {...register("techStack")}
                      disabled={isLoading}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{tech.name}</span>
                  </label>
                ))}
              </div>
              {errors.techStack && (
                <p className="text-sm text-red-600 mt-1">
                  {(errors.techStack as any)?.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Image
              </label>
              <div className="space-y-4">
                {imagePreviewUrl && (
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    disabled={isLoading}
                    className="block w-full text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {/* Only show error if image is required, which it is not */}
                  {errors.image && errors.image.message && (
                    <p className="text-sm text-red-600 mt-1">
                      {(errors.image as any).message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || isSubmitting}>
                {isLoading ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEdit ? "Update Project" : "Create Project"}
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
