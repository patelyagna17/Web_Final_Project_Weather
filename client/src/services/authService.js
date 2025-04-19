import axios from "axios"

// Create a dedicated axios instance for auth
const authAxios = axios.create({
  baseURL: "http://localhost:3080/api", // Changed to port 3080
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Request interceptor for adding token
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Authentication services
const authService = {
  // Register user
  register: async (userData) => {
    const response = await authAxios.post("/users/register", userData)
    return response.data
  },

  // Login user
  login: async (userData) => {
    const response = await authAxios.post("/users/login", userData)
    return response.data
  },

  // Logout user
  logout: async () => {
    const response = await authAxios.get("/users/logout")
    return response.data
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await authAxios.get("/users/me")
    return response.data
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await authAxios.put("/users/profile", userData)
    return response.data
  },
}

export default authService
