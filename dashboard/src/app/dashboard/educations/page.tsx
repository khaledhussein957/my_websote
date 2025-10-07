"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchEducations as fetchEducation,
  deleteEducation,
  clearEducationError as clearError,
  clearEducationSuccess as clearSuccess,
} from "@/lib/slices/educationSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Search, Plus, Edit, Trash2, BookOpen } from "lucide-react";
import EducationForm from "../../../components/educations/EducationForm";
import type { Education } from "@/lib/slices/educationSlice";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function EducationPage() {
  const dispatch = useAppDispatch();
  const { educationList, isLoading, isDeletingIds, error, success } =
    useAppSelector((state) => state.education);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const isDeleting = deleteId ? isDeletingIds.includes(deleteId) : false;

  useEffect(() => {
    dispatch(fetchEducation());
  }, [dispatch]);

  // Clear messages after 5 seconds
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

  // close dialog after success
  useEffect(() => {
    if (success && deleteId) {
      setDeleteId(null); // close dialog manually
    }
  }, [success, deleteId]);

  const filteredEducation = educationList.filter((edu) => {
    return (
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateEducation = () => {
    setEditingEducation(null);
    setShowForm(true);
  };

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    setShowForm(true);
  };

  const handleDeleteEducation = (id: string) => {
    setDeleteId(id);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEducation(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEducation(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Education Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your educational qualifications
          </p>
        </div>
        <Button onClick={handleCreateEducation}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search education..."
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
                    Degree
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Institution
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    GPA
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Year
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEducation.map((edu) => (
                  <tr
                    key={edu._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      {edu.degree}
                    </td>
                    <td className="py-3 px-4">{edu.institution}</td>
                    <td className="py-3 px-4">{edu.gpa ? edu.gpa : "N/A"}</td>
                    <td className="py-3 px-4">
                      {edu.startYear} - {edu.endYear}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditEducation(edu)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEducation(edu._id)}
                        disabled={isDeletingIds.includes(edu._id)}
                      >
                        {isDeletingIds.includes(edu._id) ? (
                          <Spinner className="h-4 w-4 animate-spin text-red-600" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-600" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                Loading education...
              </div>
            ) : filteredEducation.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No education entries found matching your search"
                  : "No education entries found"}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              education entry from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteId) dispatch(deleteEducation(deleteId));
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner className="h-4 w-4 animate-spin text-white" />
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Education Form Modal */}
      {showForm && (
        <EducationForm
          education={editingEducation}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
