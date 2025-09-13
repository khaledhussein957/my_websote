'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

interface TechStack {
  _id: string
  name: string
  icon: string
  category: string
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  createdAt: string
  updatedAt: string
}

export default function TechStackPage() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterProficiency, setFilterProficiency] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingTechStack, setEditingTechStack] = useState<TechStack | null>(null)

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await api.get('/techstacks')
        // setTechStacks(response.data)
        
        // Mock data for now
        setTimeout(() => {
          setTechStacks([
            {
              _id: '1',
              name: 'React',
              icon: '⚛️',
              category: 'Frontend',
              proficiency: 'advanced',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              name: 'Node.js',
              icon: '🟢',
              category: 'Backend',
              proficiency: 'intermediate',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '3',
              name: 'MongoDB',
              icon: '🍃',
              category: 'Database',
              proficiency: 'intermediate',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '4',
              name: 'TypeScript',
              icon: '🔷',
              category: 'Frontend',
              proficiency: 'advanced',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '5',
              name: 'Python',
              icon: '🐍',
              category: 'Backend',
              proficiency: 'expert',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ])
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch tech stacks:', error)
        setIsLoading(false)
      }
    }

    fetchTechStacks()
  }, [])

  const categories = Array.from(new Set(techStacks.map(ts => ts.category)))
  const proficiencies = ['beginner', 'intermediate', 'advanced', 'expert']

  const filteredTechStacks = techStacks.filter(techStack => {
    const matchesSearch = techStack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         techStack.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || techStack.category === filterCategory
    const matchesProficiency = filterProficiency === 'all' || techStack.proficiency === filterProficiency
    
    return matchesSearch && matchesCategory && matchesProficiency
  })

  const getProficiencyBadge = (proficiency: string) => {
    switch (proficiency) {
      case 'expert':
        return <Badge variant="success">Expert</Badge>
      case 'advanced':
        return <Badge variant="default">Advanced</Badge>
      case 'intermediate':
        return <Badge variant="secondary">Intermediate</Badge>
      case 'beginner':
        return <Badge variant="outline">Beginner</Badge>
      default:
        return <Badge variant="secondary">{proficiency}</Badge>
    }
  }

  const handleCreateTechStack = () => {
    setEditingTechStack(null)
    setShowForm(true)
  }

  const handleEditTechStack = (techStack: TechStack) => {
    setEditingTechStack(techStack)
    setShowForm(true)
  }

  const handleDeleteTechStack = async (techStackId: string) => {
    if (confirm('Are you sure you want to delete this tech stack?')) {
      try {
        // await api.delete(`/techstacks/${techStackId}`)
        setTechStacks(techStacks.filter(ts => ts._id !== techStackId))
      } catch (error) {
        console.error('Failed to delete tech stack:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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

      <Card>
        <CardHeader>
          <CardTitle>Tech Stacks</CardTitle>
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
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterProficiency}
              onChange={(e) => setFilterProficiency(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Levels</option>
              {proficiencies.map(proficiency => (
                <option key={proficiency} value={proficiency}>
                  {proficiency.charAt(0).toUpperCase() + proficiency.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Icon</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Proficiency</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTechStacks.map((techStack) => (
                  <tr key={techStack._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">{techStack.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-2xl">{techStack.icon}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{techStack.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {getProficiencyBadge(techStack.proficiency)}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatDateTime(techStack.createdAt)}
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
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTechStacks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tech stacks found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
