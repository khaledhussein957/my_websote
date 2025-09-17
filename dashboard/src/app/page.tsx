'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { checkAuth, logoutUser } from '@/lib/slices/authSlice'

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(checkAuth())
    }
  }, [dispatch])

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard') // ✅ replace avoids polluting history stack
      } else {
        router.replace('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  // Optional: Add a logout button for demonstration
  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.replace('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-gray-900 dark:border-white"></div>
      {/* Optional: Logout button for testing */}
      <button
        onClick={handleLogout}
        className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
