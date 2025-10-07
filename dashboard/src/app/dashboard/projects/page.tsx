"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProjects,
  deleteProject,
  clearError,
  clearSuccess,
  updateProject,
} from "@/lib/slices/projectSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  ExternalLink,
  Github,
  Star,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/lib/slices/projectSlice";

import { toast, Toaster } from "sonner"; // Import Sonner

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { projects, isLoading, deletingIds, error, success } = useAppSelector(
    (state) => state.project
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Toast notifications for success and error
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  const filteredProjects = projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleToggleFeatured = (project: Project) => {
    dispatch(
      updateProject({
        id: project._id,
        projectData: { featured: !project.featured },
      })
    );
  };

  const handleDeleteProject = () => {
    if (projectToDelete) {
      dispatch(deleteProject(projectToDelete._id));
      setProjectToDelete(null);
    }
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your projects
          </p>
        </div>
        <Button onClick={handleCreateProject} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Tech Stack
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Links
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Featured
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Created
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-start space-x-3">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <FolderOpen className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                            {project.description.slice(0, 45)} ...
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            by {project.user?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge
                          key={`more-${project._id}`}
                          variant="outline"
                          className="text-xs"
                        >
                          {project.techStack.length}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {project.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant={project.featured ? "default" : "outline"}
                        onClick={() => handleToggleFeatured(project)}
                        disabled={isLoading}
                      >
                        <Star
                          className={`h-4 w-4 mr-1 ${
                            project.featured
                              ? "text-yellow-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        />
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewProject(project)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                          disabled={isLoading}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* AlertDialog for Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={deletingIds.includes(project._id)}
                              onClick={() => setProjectToDelete(project)}
                            >
                              {deletingIds.includes(project._id) ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-red-600 mx-auto"></div>
                              ) : (
                                <Trash2 className="h-4 w-4 text-red-600" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Project
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{project.title}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteProject}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No projects found matching your search"
                  : "No projects found"}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* View Project Modal */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg relative shadow-lg">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewingProject(null)}
              className="absolute top-3 right-3"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Project Image */}
            {viewingProject.image ? (
              <img
                src={viewingProject.image}
                alt={viewingProject.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4 flex items-center justify-center">
                <FolderOpen className="h-12 w-12 text-gray-400" />
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{viewingProject.title}</h2>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
              {viewingProject.description || "No description available."}
            </p>

            {/* Tech Stack */}
            {viewingProject.techStack &&
              viewingProject.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {viewingProject.techStack.map(
                    (tech: { _id: string; name: string }) => (
                      <Badge key={tech._id} variant="outline">
                        {tech.name}
                      </Badge>
                    )
                  )}
                </div>
              )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 mb-4">
              {viewingProject.githubUrl && (
                <a
                  href={viewingProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {viewingProject.liveDemoUrl && (
                <a
                  href={viewingProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>

            {/* Featured & Created Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>Featured: {viewingProject.featured ? "Yes" : "No"}</p>
              <p>Created by: {viewingProject.user?.name || "Unknown"}</p>
              <p>Created at: {formatDate(viewingProject.createdAt)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
