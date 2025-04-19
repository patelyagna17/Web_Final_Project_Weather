"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [validated, setValidated] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { name, email, subject, message } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setValidated(false)
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Contact Us</h1>

      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Get in Touch</h2>

              {submitted && (
                <Alert variant="success" className="mb-4">
                  Thank you for your message! We'll get back to you as soon as possible.
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Your name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Your email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={onChange}
                    placeholder="Subject"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a subject.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={message}
                    onChange={onChange}
                    placeholder="Your message"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a message.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Contact Information</h2>

              <div className="mb-4">
                <h5>
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  Address
                </h5>
                <p className="ms-4 mb-0">123 Weather Street</p>
                <p className="ms-4 mb-0">Forecast City, FC 12345</p>
                <p className="ms-4 mb-0">United States</p>
              </div>

              <div className="mb-4">
                <h5>
                  <i className="fas fa-envelope text-primary me-2"></i>
                  Email
                </h5>
                <p className="ms-4 mb-0">
                  <a href="mailto:info@weatherforecast.com">info@weatherforecast.com</a>
                </p>
                <p className="ms-4 mb-0">
                  <a href="mailto:support@weatherforecast.com">support@weatherforecast.com</a>
                </p>
              </div>

              <div className="mb-4">
                <h5>
                  <i className="fas fa-phone text-primary me-2"></i>
                  Phone
                </h5>
                <p className="ms-4 mb-0">
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </p>
              </div>

              <div>
                <h5>
                  <i className="fas fa-clock text-primary me-2"></i>
                  Business Hours
                </h5>
                <p className="ms-4 mb-0">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="ms-4 mb-0">Saturday: 10:00 AM - 2:00 PM</p>
                <p className="ms-4 mb-0">Sunday: Closed</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact
