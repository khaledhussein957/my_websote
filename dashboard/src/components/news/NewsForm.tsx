'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createNews, updateNews, clearError, clearSuccess } from '@/lib/slices/newsSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Save, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { News } from '@/lib/slices/newsSlice'

interface NewsFormProps {
  news?: News | null
  onClose: () => void
  onSuccess?: () => void
}

export default function NewsForm({ news, onClose, onSuccess }: NewsFormProps) {
  const dispatch = useAppDispatch()
  const { isCreating, isUpdating, error, success } = useAppSelector((state) => state.news)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventAt: '',
  })
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const isLoading = isCreating || isUpdating

  // Initialize form data when editing
  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        description: news.description,
        eventAt: news.eventAt.split('T')[0], // Convert to date input format
      })
      if (news.image) {
        setImagePreview(news.image)
      }
    }
  }, [news])

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearError())
        dispatch(clearSuccess())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success, dispatch])

  // Handle success
  useEffect(() => {
    if (success && onSuccess) {
      onSuccess()
    }
  }, [success, onSuccess])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.eventAt) {
      return
    }

    dispatch(clearError())
    dispatch(clearSuccess())

    const newsData = {
      title: formData.title,
      description: formData.description,
      eventAt: new Date(formData.eventAt).toISOString(),
      image: selectedImage || undefined,
    }

    if (news) {
      // Update existing news
      dispatch(updateNews({ id: news._id, newsData }))
    } else {
      // Create new news
      dispatch(createNews(newsData))
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10  flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {news ? 'Edit News' : 'Create New News'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {/* Error and Success Messages */}
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                <div className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 mb-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                <div className="text-sm text-green-700 dark:text-green-400">
                  {success}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Enter news title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter news description"
              />
            </div>

            {/* Event Date */}
            <div>
              <label htmlFor="eventAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Date *
              </label>
              <Input
                id="eventAt"
                name="eventAt"
                type="date"
                value={formData.eventAt}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                News Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
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
              <Button
                type="submit"
                disabled={isLoading || !formData.title || !formData.description || !formData.eventAt}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? (news ? 'Updating...' : 'Creating...') : (news ? 'Update News' : 'Create News')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
