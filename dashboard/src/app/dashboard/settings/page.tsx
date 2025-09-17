'use client'

import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { updateProfile, clearError, clearSuccess } from '@/lib/slices/userSlice'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, ProfileSchema } from '@/validations/profile.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Save, AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { isUpdating, error, success } = useAppSelector((state) => state.user)

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      title: user?.title || '',
      about_me: user?.about_me || '',
    },
  })

  // Update form values when user changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        title: user.title || '',
        about_me: user.about_me || '',
      })
    }
  }, [user, reset])

  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  const onSubmit = (data: ProfileSchema) => {
    dispatch(clearError())
    dispatch(clearSuccess())
    dispatch(updateProfile({
      ...data,
      image: selectedImage || undefined,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
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
                  className="block w-full text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <Input id="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <Input id="phone" {...register('phone')} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="about_me" className="block text-sm font-medium mb-1">About Me</label>
            <textarea
              id="about_me"
              {...register('about_me')}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Tell us about yourself..."
            />
            {errors.about_me && <p className="text-xs text-red-500">{errors.about_me.message}</p>}
          </div>

          <Button type="submit" disabled={isUpdating}>
            <Save className="h-4 w-4 mr-2" />
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
