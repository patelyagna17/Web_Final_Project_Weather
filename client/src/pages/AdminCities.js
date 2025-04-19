"use client"

import { useState, useEffect } from "react"
import { Container, Table, Button, Modal, Alert } from "react-bootstrap"
import axios from "axios"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

const AdminCities = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCity, setCurrentCity] = useState(null)

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      setLoading(true)
      setError(null)

      // Use the correct port (3080) and add authorization header
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }

      const res = await axios.get("http://localhost:3080/api/admin/cities", config)

      // Check if the response has the expected structure
      if (res.data && res.data.success) {
        setCities(res.data.data || [])
      } else {
        throw new Error("Invalid response format")
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching cities:", err)
      setError("Failed to load cities. Please check your connection and permissions.")
      toast.error("Failed to load cities")
      setLoading(false)
    }
  }

  const handleDeleteClick = (city) => {
    setCurrentCity(city)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      // Use the correct port (3080) and add authorization header
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }

      await axios.delete(`http://localhost:3080/api/admin/cities/${currentCity._id}`, config)
      setShowDeleteModal(false)
      toast.success("City deleted successfully")
      fetchCities()
    } catch (err) {
      console.error("Error deleting city:", err)
      toast.error("Failed to delete city")
    }
  }

  if (loading) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Manage Cities</h1>
        <Spinner />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Manage Cities</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Manage Cities</h1>

      {cities.length === 0 ? (
        <Alert variant="info">No saved cities found.</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>City</th>
            
              <th>User</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city._id}>
                <td>{city.name}</td>
               
                <td>{city.user?.name || "Unknown"}</td>
                <td>{new Date(city.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(city)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete City Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {currentCity?.name}
            </strong>{" "}
            from favorites?
          </p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AdminCities
