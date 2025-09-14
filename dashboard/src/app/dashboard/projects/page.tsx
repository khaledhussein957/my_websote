'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchProjects, deleteProject, clearError, clearSuccess } from '@/lib/slices/projectSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle, FolderOpen, ExternalLink, Github } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import ProjectForm from '@/components/projects/ProjectForm'
import { Project } from '@/lib/slices/projectSlice'

export default function ProjectsPage() {
  const dispatch = useAppDispatch()
  const { projects, isLoading, isDeleting, error, success } = useAppSelector((state) => state.project)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const handleCreateProject = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId))
    }
  }

  const handleViewProject = (project: Project) => {
    console.log('View project:', project)
    // TODO: Implement view functionality - could open in a modal or navigate to detail page
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your projects
          </p>
        </div>
        <Button onClick={handleCreateProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
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
          <CardTitle>Projects</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tech Stack</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Links</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-start space-x-3">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-12 h-12 object-cover rounded-lg" 
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <FolderOpen className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white">{project.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                            {project.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            by {project.user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map(tech => (
                          <Badge key={tech._id} variant="outline" className="text-xs">
                            {tech.name}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a 
                            href={project.liveDemoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatDateTime(project.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewProject(project)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project._id)}
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
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No projects found matching your search' : 'No projects found'}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}
