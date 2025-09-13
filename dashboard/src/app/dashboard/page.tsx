'use client'

import { useState, useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FolderOpen, Newspaper, Code, TrendingUp, Activity } from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalProjects: number
  totalNews: number
  totalTechStacks: number
  newUsersThisMonth: number
  newProjectsThisMonth: number
  newNewsThisMonth: number
}

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalNews: 0,
    totalTechStacks: 0,
    newUsersThisMonth: 0,
    newProjectsThisMonth: 0,
    newNewsThisMonth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await api.get('/dashboard/stats')
        // setStats(response.data)
        
        // Mock data for now
        setTimeout(() => {
          setStats({
            totalUsers: 150,
            totalProjects: 45,
            totalNews: 12,
            totalTechStacks: 25,
            newUsersThisMonth: 8,
            newProjectsThisMonth: 3,
            newNewsThisMonth: 2,
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: stats.newUsersThisMonth,
      changeLabel: 'new this month',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: stats.newProjectsThisMonth,
      changeLabel: 'new this month',
      icon: FolderOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Total News',
      value: stats.totalNews,
      change: stats.newNewsThisMonth,
      changeLabel: 'new this month',
      icon: Newspaper,
      color: 'bg-yellow-500',
    },
    {
      title: 'Tech Stacks',
      value: stats.totalTechStacks,
      change: 0,
      changeLabel: 'total',
      icon: Code,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change > 0 ? '+' : ''}{stat.change} {stat.changeLabel}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Chart will be implemented here</p>
                <p className="text-sm">Using Recharts or similar library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">John Doe joined the platform</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Project submitted</p>
                  <p className="text-xs text-muted-foreground">E-commerce website project</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">News article published</p>
                  <p className="text-xs text-muted-foreground">Technology trends update</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="font-medium">Approve Pending Projects</div>
              <div className="text-sm text-muted-foreground">3 projects waiting for approval</div>
            </button>
            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="font-medium">Create New News Post</div>
              <div className="text-sm text-muted-foreground">Share latest updates</div>
            </button>
            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="font-medium">Manage Tech Stack</div>
              <div className="text-sm text-muted-foreground">Add or update technologies</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
