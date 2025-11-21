"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchTechStacks,
  deleteTechStack,
  clearError,
  clearSuccess,
} from "@/lib/slices/techstackSlice";
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
  Code,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import TechStackForm from "@/components/techstack/TechStackForm";
import { TechStack } from "@/lib/slices/techstackSlice";

export default function TechStackPage() {
  const dispatch = useAppDispatch();
  const { techStacks, isLoading, isDeleting, error, success } = useAppSelector(
    (state) => state.techstack
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTechStack, setEditingTechStack] = useState<TechStack | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchTechStacks());
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

  const filteredTechStacks = techStacks.filter((techStack) => {
    const matchesSearch =
      techStack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      techStack.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getProficiencyBadge = (proficiency: number) => {
    if (proficiency <= 2) return <Badge variant="outline">Beginner</Badge>;
    if (proficiency <= 4) return <Badge variant="secondary">Novice</Badge>;
    if (proficiency <= 6) return <Badge variant="default">Intermediate</Badge>;
    if (proficiency <= 8) return <Badge variant="default">Advanced</Badge>;
    return <Badge variant="default">Expert</Badge>;
  };

  const handleCreateTechStack = () => {
    setEditingTechStack(null);
    setShowForm(true);
  };

  const handleEditTechStack = (techStack: TechStack) => {
    setEditingTechStack(techStack);
    setShowForm(true);
  };

  const handleDeleteTechStack = async (techStackId: string) => {
    if (confirm("Are you sure you want to delete this tech stack?")) {
      dispatch(deleteTechStack(techStackId));
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTechStack(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTechStack(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tech Stack Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your technology stack and skills
          </p>
        </div>
        <Button onClick={handleCreateTechStack}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tech Stack
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tech stacks..."
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
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Icon
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Proficiency
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
                {filteredTechStacks.map((techStack) => (
                  <tr
                    key={techStack._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="font-medium text-gray-900 dark:text-white">
                          {techStack.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {techStack.icon ? (
                        <img
                          src={techStack.icon}
                          alt={techStack.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                          <Code className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {techStack.category.map((c: any, index: number) => (
                        <Badge
                          key={c._id || `${techStack._id}-category-${index}`}
                          variant="outline"
                        >
                          {c.name}
                        </Badge>
                      ))}
                    </td>
                    <td className="py-3 px-4">
                      {getProficiencyBadge(techStack.proficiency)}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatDate(techStack.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditTechStack(techStack)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTechStack(techStack._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                Loading tech stacks...
              </div>
            ) : filteredTechStacks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No tech stacks found matching your search"
                  : "No tech stacks found"}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* TechStack Form Modal */}
      {showForm && (
        <TechStackForm
          techStack={editingTechStack}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
