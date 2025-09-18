"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
  clearExperienceError,
  clearExperienceSuccess,
  Experience,
} from "@/lib/slices/experienceSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle,
  BookOpen,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import ExperienceForm from "../../../components/experiences/ExperienceForm";
import { formatDate } from "@/lib/utils";

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

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearExperienceError());
        dispatch(clearExperienceSuccess());
      }, 5000);
      return () => clearTimeout(timer);
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
    if (confirm("Are you sure you want to delete this experience?")) {
      dispatch(deleteExperience(id));
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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

      {/* Messages */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-400">
            {error}
          </span>
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-400">
            {success}
          </span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Experience Entries</CardTitle>
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
          <div className="overflow-x-auto">
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
                      {exp.startYear} - {exp.endYear}
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
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                Loading experiences...
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
    </div>
  );
}
