"use client"

import { useState, useContext, useEffect } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import AuthContext from "../context/AuthContext"
import WeatherContext from "../context/WeatherContext"
import CityList from "../components/CityList"
import { toast } from "react-toastify"

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext)
  const { getFavoriteCities } = useContext(WeatherContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      })
    }

    getFavoriteCities()
  }, [user, getFavoriteCities])

  const { name, email } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      await updateProfile({ name, email })
      setSuccess("Profile updated successfully")
      toast.success("Profile updated successfully")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
      setSuccess("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">
        <i className="fas fa-user-circle me-2 text-primary"></i>
        Your Profile
      </h1>

      <Row>
        <Col lg={6} className="mb-4 mb-lg-0">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h3 className="mb-4 border-bottom pb-3">
                <i className="fas fa-id-card me-2 text-primary"></i>
                Profile Information
              </h3>

              {error && (
                <Alert variant="danger">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success">
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={name} onChange={onChange} required className="py-2" />
                  <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={email} onChange={onChange} required className="py-2" />
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <div className="py-2 px-3 bg-light rounded">
                    <span className={`badge ${user?.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                      {user?.role === "admin" ? (
                        <>
                          <i className="fas fa-shield-alt me-1"></i> Admin
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user me-1"></i> User
                        </>
                      )}
                    </span>
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Update Profile
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h3 className="mb-4 border-bottom pb-3">
                <i className="fas fa-star me-2 text-primary"></i>
                Your Favorite Cities
              </h3>
              <CityList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
