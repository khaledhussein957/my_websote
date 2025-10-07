"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchNews,
  deleteNews,
  clearError,
  clearSuccess,
} from "@/lib/slices/newsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import NewsForm from "@/components/news/NewsForm";
import { News } from "@/lib/slices/newsSlice";

export default function NewsPage() {
  const dispatch = useAppDispatch();
  const { news, isLoading, isDeleting, error, success } = useAppSelector(
    (state) => state.news
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [viewingNews, setViewingNews] = useState<News | null>(null);

  useEffect(() => {
    dispatch(fetchNews());
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

  const filteredNews = news.filter((newsItem) => {
    const matchesSearch =
      newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleCreateNews = () => {
    setEditingNews(null);
    setShowForm(true);
  };

  const handleEditNews = (newsItem: News) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const handleDeleteNews = async (newsId: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      dispatch(deleteNews(newsId));
    }
  };

  const handleViewNews = (newsItem: News) => {
    setViewingNews(newsItem);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  return (
    <div className="space-y-5">
      {/* Header & Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            News Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage news articles and updates
          </p>
        </div>
        <Button onClick={handleCreateNews}>
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </Button>
      </div>

      {/* Error & Success Messages */}
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

      {/* News Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search news..."
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
                  <th>Image</th>
                  <th>Title</th>
                  <th>Event Date</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((newsItem) => (
                  <tr
                    key={newsItem._id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4">
                      {newsItem.image ? (
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{newsItem.title}</td>
                    <td className="py-3 px-4">
                      {formatDate(newsItem.eventAt)}
                    </td>
                    <td className="py-3 px-4">
                      {newsItem.user?.name || "Unknown"}
                    </td>
                    <td className="py-3 px-4">
                      {formatDateTime(newsItem.createdAt)}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewNews(newsItem)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditNews(newsItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNews(newsItem._id)}
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
              <div className="text-center py-8">Loading news...</div>
            )}
            {filteredNews.length === 0 && !isLoading && (
              <div className="text-center py-8">No news found</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* News Form Modal */}
      {showForm && (
        <NewsForm
          news={editingNews}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* View News Modal */}
      {viewingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-lg relative shadow-lg">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewingNews(null)}
              className="absolute top-3 right-3"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image */}
            {viewingNews.image && (
              <img
                src={viewingNews.image}
                alt={viewingNews.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{viewingNews.title}</h2>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
              {viewingNews.description}
            </p>

            {/* Additional Details */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>Event Date: {formatDate(viewingNews.eventAt)}</p>
              <p>Created By: {viewingNews.user?.name || "Unknown"}</p>
              <p>Created At: {formatDateTime(viewingNews.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
