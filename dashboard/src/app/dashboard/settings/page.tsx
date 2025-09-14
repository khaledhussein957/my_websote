'use client'

import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { updateProfile, changePassword, clearError, clearSuccess } from '@/lib/slices/userSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sun, Moon, Monitor, Save, Key, User, AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { 
    currentUser, 
    isUpdating, 
    isChangingPassword, 
    error, 
    success 
  } = useAppSelector((state) => state.user)
  
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    title: user?.title || '',
    about_me: user?.about_me || '',
  })
  
  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    comfirmPassword: '',
  })
  
  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        title: user.title || '',
        about_me: user.about_me || '',
      })
    }
  }, [user])
  
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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(clearSuccess())
    
    dispatch(updateProfile({
      ...profileData,
      image: selectedImage || undefined,
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.comfirmPassword) {
      dispatch(clearError())
      dispatch(clearSuccess())
      // You could dispatch a custom error action here
      return
    }
    
    dispatch(clearError())
    dispatch(clearSuccess())
    
    dispatch(changePassword(passwordData))
    
    // Reset form on success
    if (!error) {
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        comfirmPassword: '',
      })
    }
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    if (typeof window !== 'undefined') {
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', systemTheme === 'dark')
      } else {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : user?.image ? (
                      <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={profileData.title}
                  onChange={handleProfileChange}
                  placeholder="e.g., Software Developer"
                />
              </div>

              <div>
                <label htmlFor="about_me" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  About Me
                </label>
                <textarea
                  id="about_me"
                  name="about_me"
                  value={profileData.about_me}
                  onChange={handleProfileChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <Button type="submit" disabled={isUpdating}>
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="comfirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <Input
                  id="comfirmPassword"
                  name="comfirmPassword"
                  type="password"
                  value={passwordData.comfirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isChangingPassword}>
                <Key className="h-4 w-4 mr-2" />
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              Theme Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred theme
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => applyTheme('light')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Sun className="h-5 w-5 mb-2" />
                  Light
                </Button>
                
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => applyTheme('dark')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Moon className="h-5 w-5 mb-2" />
                  Dark
                </Button>
                
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => applyTheme('system')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Monitor className="h-5 w-5 mb-2" />
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  User ID
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {user?._id}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Theme
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {theme}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Member Since
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Updated
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
