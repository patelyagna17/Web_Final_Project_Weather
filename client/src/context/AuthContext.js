"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"

// Create a dedicated axios instance for auth
const authAxios = axios.create({
  baseURL: "http://localhost:3080/api", // Changed to port 3080
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Set axios defaults
  useEffect(() => {
    if (token) {
      authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete authAxios.defaults.headers.common["Authorization"]
    }
  }, [token])

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await authAxios.get("/users/me")
          setUser(res.data.data)
          setIsAuthenticated(true)
        } catch (err) {
          console.error("Error loading user:", err)
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
          setIsAuthenticated(false)
          setError(err.response?.data?.message || "Authentication failed")
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [token])

  // Register user
  const register = async (userData) => {
    try {
      console.log("Registering user with data:", { ...userData, password: "[HIDDEN]" })

      // Use the explicit URL with authAxios
      const res = await authAxios.post("/users/register", userData)
      console.log("Registration response:", res.data)

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
        setUser(res.data.user)
        setIsAuthenticated(true)
        setError(null)
      }
      return res.data
    } catch (err) {
      console.error("Registration error:", err)
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Registration failed"
      setError(errorMsg)
      throw err
    }
  }

  // Login user
  const login = async (userData) => {
    try {
      const res = await authAxios.post("/users/login", userData)

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
        setUser(res.data.user)
        setIsAuthenticated(true)
        setError(null)
      }
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      throw err
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await authAxios.get("/users/logout")
      localStorage.removeItem("token")
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed")
    }
  }

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const res = await authAxios.put("/users/profile", userData)
      setUser(res.data.data)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed")
      throw err
    }
  }

  // Clear errors
  const clearErrors = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
