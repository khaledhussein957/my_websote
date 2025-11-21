import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { projectApi, ProjectData } from "@/api/project";

export const useProjects = () => {
  return useQuery<ProjectData[]>({
    queryKey: ["projects"],
    queryFn: projectApi.getProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createProject"],
    mutationFn: (data: ProjectData) => projectApi.createProject(data),
    onSuccess: () => {
      AlertMessage.success("Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create project"
      ),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProject"],
    mutationFn: ({ id, data }: { id: string; data: ProjectData }) =>
      projectApi.updateProject(id, data),
    onSuccess: () => {
      AlertMessage.success("Project updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update project"
      ),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: (id: string) => projectApi.deleteProject(id),
    onSuccess: () => {
      AlertMessage.success("Project deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete project"
      ),
  });
};
