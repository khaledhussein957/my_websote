"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchEducations as fetchEducation,
  deleteEducation,
  clearEducationError as clearError,
  clearEducationSuccess as clearSuccess,
} from "@/lib/slices/educationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import EducationForm from "../../../components/educations/EducationForm";
import type { Education } from "@/lib/slices/educationSlice";

export default function EducationPage() {
  const dispatch = useAppDispatch();
  const { educationList, isLoading, isDeleting, error, success } =
    useAppSelector((state) => state.education);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchEducation());
  }, [dispatch]);

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

  const handleDeleteEducation = async (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      dispatch(deleteEducation(id));
    }
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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

      {/* Error and Success Messages */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <div className="text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
            <div className="text-sm text-green-700 dark:text-green-400">
              {success}
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Education Entries</CardTitle>
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
                    <td className="py-3 px-4" >{edu.gpa ? edu.gpa : "N/A"}</td>
                    <td className="py-3 px-4">{edu.startYear} - {edu.endYear}</td>
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
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
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
