'use client'

import { useState, useEffect } from 'react'
import { Bell, Search, User, Moon, Sun, Menu, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchNotifications,
  markNotificationAsRead,
} from '@/lib/slices/notificationSlice'

interface HeaderProps {
  onMenuClick?: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const dispatch = useAppDispatch()
  const { items: notifications } = useAppSelector((state) => state.notification)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  }

  // Fetch notifications on mount
  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationAsRead(id))
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side: menu + search */}
        <div className="flex items-center space-x-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>
        </div>

        {/* Right side: theme, notifications, profile */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                {notifications.length === 0 && (
                  <p className="p-4 text-sm text-gray-500 dark:text-gray-300">
                    No notifications
                  </p>
                )}
                {notifications.map((notif) => (
                  <div
                    key={notif._id}
                    className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      !notif.isRead ? 'bg-gray-50 dark:bg-gray-900 font-medium' : ''
                    }`}
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white">{notif.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {notif.message}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(notif._id)}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
