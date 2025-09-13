'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, Eye, Star, Globe, EyeOff } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

interface News {
  _id: string
  title: string
  content: string
  images: string[]
  category: string
  featured: boolean
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'not-featured'>('all')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await api.get('/news')
        // setNews(response.data)
        
        // Mock data for now
        setTimeout(() => {
          setNews([
            {
              _id: '1',
              title: 'New React Features Released',
              content: 'React 18 introduces new features including concurrent rendering, automatic batching, and new hooks.',
              images: ['/images/react-18.jpg'],
              category: 'Technology',
              featured: true,
              published: true,
              publishedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              title: 'Portfolio Website Update',
              content: 'I have updated my portfolio website with new projects and improved design.',
              images: ['/images/portfolio-update.jpg'],
              category: 'Personal',
              featured: false,
              published: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '3',
              title: 'Web Development Trends 2024',
              content: 'Exploring the latest trends in web development including AI integration, performance optimization, and modern frameworks.',
              images: ['/images/web-trends.jpg'],
              category: 'Technology',
              featured: false,
              published: true,
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ])
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch news:', error)
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const categories = Array.from(new Set(news.map(n => n.category)))

  const filteredNews = news.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsItem.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || newsItem.category === filterCategory
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && newsItem.published) ||
                         (filterStatus === 'draft' && !newsItem.published)
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && newsItem.featured) ||
                           (filterFeatured === 'not-featured' && !newsItem.featured)
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured
  })

  const handleCreateNews = () => {
    console.log('Create new news article')
    // TODO: Implement create functionality
  }

  const handleEditNews = (newsItem: News) => {
    console.log('Edit news:', newsItem)
    // TODO: Implement edit functionality
  }

  const handleDeleteNews = async (newsId: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      try {
        // await api.delete(`/news/${newsId}`)
        setNews(news.filter(n => n._id !== newsId))
      } catch (error) {
        console.error('Failed to delete news:', error)
      }
    }
  }

  const handleToggleFeatured = async (newsId: string, featured: boolean) => {
    try {
      // await api.patch(`/news/${newsId}`, { featured })
      setNews(news.map(n => n._id === newsId ? { ...n, featured } : n))
    } catch (error) {
      console.error('Failed to toggle featured status:', error)
    }
  }

  const handleTogglePublished = async (newsId: string, published: boolean) => {
    try {
      // await api.patch(`/news/${newsId}`, { 
      //   published,
      //   publishedAt: published ? new Date().toISOString() : undefined
      // })
      setNews(news.map(n => n._id === newsId ? { 
        ...n, 
        published,
        publishedAt: published ? new Date().toISOString() : undefined
      } : n))
    } catch (error) {
      console.error('Failed to toggle published status:', error)
    }
  }

  const handleViewNews = (newsItem: News) => {
    console.log('View news:', newsItem)
    // TODO: Implement view functionality
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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

      <Card>
        <CardHeader>
          <CardTitle>News Articles</CardTitle>
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All News</option>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Featured</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Published</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((newsItem) => (
                  <tr key={newsItem._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{newsItem.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                          {newsItem.content.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{newsItem.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={newsItem.published ? 'success' : 'warning'}>
                        {newsItem.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFeatured(newsItem._id, !newsItem.featured)}
                      >
                        <Star className={`h-4 w-4 ${newsItem.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePublished(newsItem._id, !newsItem.published)}
                      >
                        {newsItem.published ? (
                          <Globe className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatDateTime(newsItem.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
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
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredNews.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No news found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
