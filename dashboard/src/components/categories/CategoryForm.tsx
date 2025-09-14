'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createCategory, updateCategory, clearError, clearSuccess } from '@/lib/slices/categorySlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Save, AlertCircle, CheckCircle } from 'lucide-react'
import { Category } from '@/lib/slices/categorySlice'

interface CategoryFormProps {
  category?: Category | null
  onClose: () => void
  onSuccess?: () => void
}

export default function CategoryForm({ category, onClose, onSuccess }: CategoryFormProps) {
  const dispatch = useAppDispatch()
  const { isCreating, isUpdating, error, success } = useAppSelector((state) => state.category)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  
  const isLoading = isCreating || isUpdating

  // Initialize form data when editing
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
      })
    }
  }, [category])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description) {
      return
    }

    dispatch(clearError())
    dispatch(clearSuccess())

    if (category) {
      // Update existing category
      dispatch(updateCategory({ id: category._id, categoryData: formData }))
    } else {
      // Create new category
      dispatch(createCategory(formData))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {category ? 'Edit Category' : 'Create New Category'}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Enter category name"
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
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter category description"
              />
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
                disabled={isLoading || !formData.name || !formData.description}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? (category ? 'Updating...' : 'Creating...') : (category ? 'Update Category' : 'Create Category')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
