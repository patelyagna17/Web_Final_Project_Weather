"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    cityCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
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

        // Make separate requests to handle potential failures individually
        const usersRes = await axios.get("http://localhost:3080/api/admin/users", config)
        const citiesRes = await axios.get("http://localhost:3080/api/admin/cities", config)

        setStats({
          userCount: usersRes.data.count,
          cityCount: citiesRes.data.count,
        })

        setLoading(false)
      } catch (error) {
        console.error("Admin dashboard error:", error)
        setError("Failed to load admin statistics. Please check your connection and permissions.")
        toast.error("Failed to load admin statistics")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Admin Dashboard</h1>
        <Spinner />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Admin Dashboard</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Total Users</h3>
              <p className="display-4">{stats.userCount}</p>
              <Link to="/admin/users" className="btn btn-primary">
                Manage Users
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Total Saved Cities</h3>
              <p className="display-4">{stats.cityCount}</p>
              <Link to="/admin/cities" className="btn btn-primary">
                Manage Cities
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3">Admin Actions</h3>
              <p>
                As an administrator, you can manage users and their saved cities. Use the links above to access the
                management pages.
              </p>
              <ul>
                <li>View all registered users</li>
                <li>Edit user information</li>
                <li>Delete users</li>
                <li>View all saved cities</li>
                <li>Delete saved cities</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
