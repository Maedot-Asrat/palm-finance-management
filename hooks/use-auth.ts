"use client"

import { useState, useEffect } from "react"

interface User {
  name: string
  email: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  const hasRole = (roles: string[]) => {
    return user ? roles.includes(user.role) : false
  }

  return {
    user,
    isLoading,
    logout,
    hasRole,
    isAuthenticated: !!user,
  }
}
