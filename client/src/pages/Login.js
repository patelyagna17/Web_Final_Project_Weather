"use client"

import { useState, useContext, useEffect } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { toast } from "react-toastify"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const { email, password } = formData

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
      await login({ email, password })
      toast.success("Login successful!")
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow border-0 rounded-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">
                  <i className="fas fa-sign-in-alt me-2 text-primary"></i>
                  Login
                </h2>
                <p className="text-muted">Sign in to access your account</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-envelope text-muted"></i>
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      required
                      className="py-2"
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock text-muted"></i>
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Enter your password"
                      required
                      minLength="6"
                      className="py-2"
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 mb-4" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none fw-bold">
                    Register
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
