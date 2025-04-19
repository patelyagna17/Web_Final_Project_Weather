import axios from "axios"

// Admin services
const adminAxios = axios.create({
  baseURL: "http://localhost:3080/api/admin", // Changed to port 3080
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Request interceptor for adding token
adminAxios.interceptors.request.use(
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

const adminService = {
  // Get all users
  getAllUsers: async () => {
    const response = await adminAxios.get("/users")
    return response.data
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await adminAxios.get(`/users/${userId}`)
    return response.data
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await adminAxios.put(`/users/${userId}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await adminAxios.delete(`/users/${userId}`)
    return response.data
  },

  // Get all cities
  getAllCities: async () => {
    const response = await adminAxios.get("/cities")
    return response.data
  },

  // Delete city
  deleteCity: async (cityId) => {
    const response = await adminAxios.delete(`/cities/${cityId}`)
    return response.data
  },
}

export default adminService
