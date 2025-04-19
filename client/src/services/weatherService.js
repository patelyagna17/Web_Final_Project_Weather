import axios from "axios"

// Create a dedicated axios instance for weather
const weatherAxios = axios.create({
  baseURL: "http://localhost:3080/api", // Changed to port 3080
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Request interceptor for adding token
weatherAxios.interceptors.request.use(
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

// Weather services
const weatherService = {
  // Get weather by city name
  getWeatherByCity: async (city) => {
    const response = await weatherAxios.get(`/weather/${city}`)
    return response.data
  },

  // Get favorite cities
  getFavoriteCities: async () => {
    const response = await weatherAxios.get("/users/cities")
    return response.data
  },

  // Add city to favorites
  addFavoriteCity: async (cityData) => {
    const response = await weatherAxios.post("/weather/favorites", cityData)
    return response.data
  },

  // Remove city from favorites
  removeFavoriteCity: async (cityId) => {
    const response = await weatherAxios.delete(`/weather/favorites/${cityId}`)
    return response.data
  },
}

export default weatherService
