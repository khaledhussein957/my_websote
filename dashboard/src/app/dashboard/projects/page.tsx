'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Eye, Check, X, Star } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

interface Project {
  _id: string
  title: string
  description: string
  images: string[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  techStack: string[]
  category: string
  featured: boolean
  status: 'pending' | 'approved' | 'rejected'
  user: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'not-featured'>('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await api.get('/projects')
        // setProjects(response.data)
        
        // Mock data for now
        setTimeout(() => {
          setProjects([
            {
              _id: '1',
              title: 'E-commerce Website',
              description: 'A full-stack e-commerce platform built with React and Node.js',
              images: ['/images/project1.jpg'],
              links: {
                github: 'https://github.com/user/ecommerce',
                live: 'https://ecommerce-demo.com',
              },
              techStack: ['React', 'Node.js', 'MongoDB'],
              category: 'Web Development',
              featured: true,
              status: 'approved',
              user: {
                _id: '1',
                name: 'John Doe',
                email: 'john@example.com',
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              title: 'Mobile App',
              description: 'A cross-platform mobile application for task management',
              images: ['/images/project2.jpg'],
              links: {
                github: 'https://github.com/user/mobile-app',
                demo: 'https://demo.com',
              },
              techStack: ['React Native', 'Firebase'],
              category: 'Mobile Development',
              featured: false,
              status: 'pending',
              user: {
                _id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '3',
              title: 'Portfolio Website',
              description: 'A modern portfolio website with dark mode support',
              images: ['/images/project3.jpg'],
              links: {
                github: 'https://github.com/user/portfolio',
                live: 'https://portfolio-demo.com',
              },
              techStack: ['Next.js', 'TypeScript', 'TailwindCSS'],
              category: 'Web Development',
              featured: false,
              status: 'rejected',
              user: {
                _id: '3',
                name: 'Bob Johnson',
                email: 'bob@example.com',
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ])
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && project.featured) ||
                           (filterFeatured === 'not-featured' && !project.featured)
    
    return matchesSearch && matchesStatus && matchesFeatured
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleEditProject = (project: Project) => {
    console.log('Edit project:', project)
    // TODO: Implement edit functionality
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        // await api.delete(`/projects/${projectId}`)
        setProjects(projects.filter(project => project._id !== projectId))
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }

  const handleApproveProject = async (projectId: string) => {
    try {
      // await api.patch(`/projects/${projectId}`, { status: 'approved' })
      setProjects(projects.map(project => 
        project._id === projectId ? { ...project, status: 'approved' as const } : project
      ))
    } catch (error) {
      console.error('Failed to approve project:', error)
    }
  }

  const handleRejectProject = async (projectId: string) => {
    try {
      // await api.patch(`/projects/${projectId}`, { status: 'rejected' })
      setProjects(projects.map(project => 
        project._id === projectId ? { ...project, status: 'rejected' as const } : project
      ))
    } catch (error) {
      console.error('Failed to reject project:', error)
    }
  }

  const handleToggleFeatured = async (projectId: string, featured: boolean) => {
    try {
      // await api.patch(`/projects/${projectId}`, { featured })
      setProjects(projects.map(project => 
        project._id === projectId ? { ...project, featured } : project
      ))
    } catch (error) {
      console.error('Failed to toggle featured status:', error)
    }
  }

  const handleViewProject = (project: Project) => {
    console.log('View project:', project)
    // TODO: Implement view functionality
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and approve user-submitted projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Featured</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{project.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                          {project.description}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{project.user.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{project.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFeatured(project._id, !project.featured)}
                      >
                        <Star className={`h-4 w-4 ${project.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </Button>
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
                        {project.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApproveProject(project._id)}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRejectProject(project._id)}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No projects found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
