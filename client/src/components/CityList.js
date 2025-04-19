"use client"

import { useContext, useEffect, useState } from "react"
import { ListGroup, Button, Spinner as BsSpinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import WeatherContext from "../context/WeatherContext"
import { toast } from "react-toastify"
import axios from "axios"

const CityList = () => {
  const { favoriteCities, getFavoriteCities, loading: contextLoading } = useContext(WeatherContext)
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const loadCities = async () => {
      try {
        await getFavoriteCities()
      } catch (error) {
        toast.error("Failed to load favorite cities")
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [])

  const handleRemove = async (id) => {
    try {
      setDeletingId(id)

      // Direct API call with proper headers
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3080/api/weather/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })

      // Refresh the list after deletion
      await getFavoriteCities()
      toast.success("City removed from favorites")
    } catch (error) {
      console.error("Error removing city:", error)
      toast.error("Failed to remove city")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading || contextLoading) {
    return <p>Loading your favorite cities...</p>
  }

  if (favoriteCities.length === 0) {
    return <p>You haven't added any cities to your favorites yet.</p>
  }

  return (
    <ListGroup className="city-list-container">
      {favoriteCities.map((city) => (
        <ListGroup.Item key={city._id} className="d-flex justify-content-between align-items-center city-list-item">
          <Link to={`/forecast/${city.name}`} className="text-decoration-none city-name">
            <i className="fas fa-map-marker-alt me-2 text-primary"></i>
            {city.name}, {city.country}
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleRemove(city._id)}
            disabled={deletingId === city._id}
            className="delete-btn"
          >
            {deletingId === city._id ? <BsSpinner animation="border" size="sm" /> : <i className="fas fa-trash"></i>}
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default CityList
