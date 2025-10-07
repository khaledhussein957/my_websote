"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchTestimonials,
  deleteTestimonial,
  clearTestimonialError as clearError,
  clearTestimonialSuccess as clearSuccess,
} from "@/lib/slices/testimonialSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import TestimonialForm from "../../../components/testimonial/TestimonialForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export interface Testimonial {
  _id: string;
  name: string;
  email: string;
  message: string;
  image?: string;
  rating: number;
  createdAt: string;
}

export default function TestimonialPage() {
  const dispatch = useAppDispatch();
  const {
    items: testimonials,
    isLoading,
    error,
    success,
  } = useAppSelector((state) => state.testimonial);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [viewingTestimonial, setViewingTestimonial] =
    useState<Testimonial | null>(null);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleDeleteConfirm = async (id: string) => {
    await dispatch(deleteTestimonial(id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Testimonials
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer testimonials
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Error & Success */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-sm text-green-700 dark:text-green-400">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <div className="relative flex-1 mt-2 sm:mt-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">{t.name}</td>
                    <td className="py-3 px-4">{t.email}</td>
                    <td className="py-3 px-4">{t.message}</td>
                    <td className="py-3 px-4 flex gap-1 mt-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < t.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewingTestimonial(t)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(t)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={deletingId === t._id} onOpenChange={(open) => { if (!open) setDeletingId(null); }}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(t._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{t.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                              <Button variant="outline">Cancel</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                variant="destructive"
                                onClick={async (e) => {
                                  e.preventDefault(); // prevent dialog from closing before action
                                  await handleDeleteConfirm(t._id);
                                }}
                              >
                                Delete
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-900 dark:border-white mx-auto mb-4"></div>
                Loading testimonials...
              </div>
            )}

            {!isLoading && filteredTestimonials.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No testimonials match your search"
                  : "No testimonials found"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Testimonial Form Modal */}
      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => setShowForm(false)}
          onSuccess={() => setShowForm(false)}
        />
      )}

      {/* Delete AlertDialog removed: now handled per row */}

      {/* View Testimonial Modal */}
      {viewingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative shadow-lg">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewingTestimonial(null)}
              className="absolute top-3 right-3"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Testimonial Image */}
            {viewingTestimonial.image ? (
              <img
                src={viewingTestimonial.image}
                alt={viewingTestimonial.name}
                className="w-32 h-32 object-cover rounded mb-4 mx-auto"
              />
            ) : null}

            {/* Name & Email */}
            <h2 className="text-xl font-bold mb-1 text-center">
              {viewingTestimonial.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              {viewingTestimonial.email}
            </p>

            {/* Message */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line text-center">
              {viewingTestimonial.message}
            </p>

            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < viewingTestimonial.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-2">
              <Button
                variant="outline"
                onClick={() => setViewingTestimonial(null)}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
