'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createProject, updateProject, clearError, clearSuccess } from '@/lib/slices/projectSlice'
import { fetchTechStacks } from '@/lib/slices/techstackSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Save, Upload, AlertCircle, CheckCircle, ExternalLink, Github } from 'lucide-react'
import { Project } from '@/lib/slices/projectSlice'

interface ProjectFormProps {
  project?: Project | null
  onClose: () => void
  onSuccess?: () => void
}

export default function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const dispatch = useAppDispatch()
  const { isCreating, isUpdating, error, success } = useAppSelector((state) => state.project)
  const { techStacks } = useAppSelector((state) => state.techstack)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveDemoUrl: '',
    techStack: [] as string[],
  })
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const isLoading = isCreating || isUpdating

  // Fetch tech stacks on component mount
  useEffect(() => {
    dispatch(fetchTechStacks())
  }, [dispatch])

  // Initialize form data when editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        githubUrl: project.githubUrl || '',
        liveDemoUrl: project.liveDemoUrl || '',
        techStack: project.techStack.map(tech => tech._id),
      })
      if (project.image) {
        setImagePreview(project.image)
      }
    }
  }, [project])

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

  const handleTechStackChange = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(techId)
        ? prev.techStack.filter(id => id !== techId)
        : [...prev.techStack, techId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || formData.techStack.length === 0) {
      return
    }

    dispatch(clearError())
    dispatch(clearSuccess())

    const projectData = {
      title: formData.title,
      description: formData.description,
      githubUrl: formData.githubUrl || undefined,
      liveDemoUrl: formData.liveDemoUrl || undefined,
      techStack: formData.techStack,
      image: selectedImage || undefined,
    }

    if (project) {
      // Update existing project
      dispatch(updateProject({ id: project._id, projectData }))
    } else {
      // Create new project
      dispatch(createProject(projectData))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {project ? 'Edit Project' : 'Create New Project'}
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
                Project Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="Enter project title"
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
                placeholder="Describe your project..."
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Github className="h-4 w-4 inline mr-1" />
                  GitHub URL
                </label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div>
                <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <ExternalLink className="h-4 w-4 inline mr-1" />
                  Live Demo URL
                </label>
                <Input
                  id="liveDemoUrl"
                  name="liveDemoUrl"
                  type="url"
                  value={formData.liveDemoUrl}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="https://your-project.com"
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tech Stack * (Select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                {techStacks.map(tech => (
                  <label key={tech._id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.techStack.includes(tech._id)}
                      onChange={() => handleTechStackChange(tech._id)}
                      disabled={isLoading}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                  </label>
                ))}
              </div>
              {formData.techStack.length === 0 && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Please select at least one technology
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Image
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
                disabled={isLoading || !formData.title || !formData.description || formData.techStack.length === 0}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? (project ? 'Updating...' : 'Creating...') : (project ? 'Update Project' : 'Create Project')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
