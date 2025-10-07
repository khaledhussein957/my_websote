"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchExperiences,
  deleteExperience,
  clearExperienceError,
  clearExperienceSuccess,
  Experience,
} from "@/lib/slices/experienceSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Edit, Trash2 } from "lucide-react";
import ExperienceForm from "@/components/experiences/ExperienceForm";
import { toast } from "sonner";

// Assume you have an AlertDialog component
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function ExperiencePage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, isDeleting, error, success } = useAppSelector(
    (state) => state.experience
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );

  // For delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  // Toast notifications & clear after showing
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearExperienceError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearExperienceSuccess());
    }
  }, [error, success, dispatch]);

  const filteredItems = items.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingExperience(null);
    setShowForm(true);
  };

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteExperience(deleteId));
    }
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Experience Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your work experiences
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1 mt-2 sm:mt-0">
            <Input
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto relative">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((exp) => (
                  <tr
                    key={exp._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">{exp.title}</td>
                    <td className="py-3 px-4">{exp.company}</td>
                    <td className="py-3 px-4">
                      {exp.startYear} - {exp.endYear ?? "Present"}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(exp)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(exp._id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-red-600" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-600" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                  Loading experiences...
                </div>
              </div>
            )}

            {!isLoading && filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No experiences found matching your search"
                  : "No experiences found"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal Form */}
      {showForm && (
        <ExperienceForm
          experience={editingExperience}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogTrigger asChild>
          {/* optionally, you may not need a trigger here because open is controlled */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Experience</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this experience? This action cannot
            be undone.
          </AlertDialogDescription>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              {isDeleting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2 inline-block" />
              ) : null}
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
