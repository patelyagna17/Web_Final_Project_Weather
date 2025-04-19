"use client"

import { createContext, useState, useCallback } from "react"
import axios from "axios"

// Create a dedicated axios instance for weather
const weatherAxios = axios.create({
  baseURL: "http://localhost:3080/api",
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

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [favoriteCities, setFavoriteCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get weather by city name - using useCallback to prevent recreation on each render
  const getWeatherByCity = useCallback(async (city) => {
    try {
      setLoading(true)
      setError(null)

      const res = await weatherAxios.get(`/weather/${city}`)

      if (res.data.success) {
        const weatherData = res.data.data

        // Extract current weather (first item in the list)
        setCurrentWeather(weatherData.list[0])

        // Extract forecast data (group by day)
        const forecastData = groupForecastByDay(weatherData.list)
        setForecast(forecastData)
      }

      setLoading(false)
      return res.data
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "Failed to fetch weather data")
      throw err
    }
  }, [])

  // Group forecast data by day
  const groupForecastByDay = (forecastList) => {
    const groupedData = {}

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()

      if (!groupedData[date]) {
        groupedData[date] = []
      }

      groupedData[date].push(item)
    })

    return groupedData
  }

  // Get favorite cities - using useCallback to prevent recreation on each render
  const getFavoriteCities = useCallback(async () => {
    try {
      setLoading(true)

      const res = await weatherAxios.get("/users/cities")

      if (res.data.success) {
        setFavoriteCities(res.data.data)
      }

      setLoading(false)
      return res.data
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "Failed to fetch favorite cities")
      throw err
    }
  }, [])

  // Add city to favorites - using useCallback to prevent recreation on each render
  const addFavoriteCity = useCallback(async (cityData) => {
    try {
      const res = await weatherAxios.post("/weather/favorites", cityData)

      if (res.data.success) {
        setFavoriteCities((prevCities) => [...prevCities, res.data.data])
      }

      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add city to favorites")
      throw err
    }
  }, [])

  // Remove city from favorites - using useCallback to prevent recreation on each render
  const removeFavoriteCity = useCallback(async (cityId) => {
    try {
      const res = await weatherAxios.delete(`/weather/favorites/${cityId}`)

      if (res.data.success) {
        setFavoriteCities((prevCities) => prevCities.filter((city) => city._id !== cityId))
      }

      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove city from favorites")
      throw err
    }
  }, [])

  // Clear errors
  const clearErrors = useCallback(() => {
    setError(null)
  }, [])

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        favoriteCities,
        loading,
        error,
        getWeatherByCity,
        getFavoriteCities,
        addFavoriteCity,
        removeFavoriteCity,
        clearErrors,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
