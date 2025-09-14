'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createTechStack, updateTechStack, clearError, clearSuccess } from '@/lib/slices/techstackSlice'
import { fetchCategories } from '@/lib/slices/categorySlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Save, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { TechStack } from '@/lib/slices/techstackSlice'

interface TechStackFormProps {
  techStack?: TechStack | null
  onClose: () => void
  onSuccess?: () => void
}

export default function TechStackForm({ techStack, onClose, onSuccess }: TechStackFormProps) {
  const dispatch = useAppDispatch()
  const { isCreating, isUpdating, error, success } = useAppSelector((state) => state.techstack)
  const { categories } = useAppSelector((state) => state.category)
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 5,
  })
  
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  
  const isLoading = isCreating || isUpdating

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Initialize form data when editing
  useEffect(() => {
    if (techStack) {
      setFormData({
        name: techStack.name,
        category: techStack.category,
        proficiency: techStack.proficiency,
      })
      if (techStack.icon) {
        setIconPreview(techStack.icon)
      }
    }
  }, [techStack])

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

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedIcon(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'proficiency' ? parseInt(value) : value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || !formData.proficiency) {
      return
    }

    dispatch(clearError())
    dispatch(clearSuccess())

    const techStackData = {
      name: formData.name,
      category: formData.category,
      proficiency: formData.proficiency,
      icon: selectedIcon || undefined,
    }

    if (techStack) {
      // Update existing tech stack
      dispatch(updateTechStack({ id: techStack._id, techStackData }))
    } else {
      // Create new tech stack
      dispatch(createTechStack(techStackData))
    }
  }

  const getProficiencyLabel = (value: number) => {
    if (value <= 2) return 'Beginner'
    if (value <= 4) return 'Novice'
    if (value <= 6) return 'Intermediate'
    if (value <= 8) return 'Advanced'
    return 'Expert'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {techStack ? 'Edit Tech Stack' : 'Create New Tech Stack'}
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
                Technology Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g., React, Node.js, Python"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Proficiency */}
            <div>
              <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proficiency Level: {getProficiencyLabel(formData.proficiency)} ({formData.proficiency}/10) *
              </label>
              <input
                id="proficiency"
                name="proficiency"
                type="range"
                min="1"
                max="10"
                value={formData.proficiency}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 (Beginner)</span>
                <span>10 (Expert)</span>
              </div>
            </div>

            {/* Icon Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technology Icon
              </label>
              <div className="space-y-4">
                {iconPreview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <img 
                      src={iconPreview} 
                      alt="Icon Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
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
                disabled={isLoading || !formData.name || !formData.category || !formData.proficiency}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? (techStack ? 'Updating...' : 'Creating...') : (techStack ? 'Update Tech Stack' : 'Create Tech Stack')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
