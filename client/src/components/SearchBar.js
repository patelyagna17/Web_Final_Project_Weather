"use client"

import { useState } from "react"
import { Form, Button, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [city, setCity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      setIsSubmitting(true)
      navigate(`/forecast/${city}`)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="search-bar">
      <InputGroup className="shadow-sm">
        <Form.Control
          type="text"
          placeholder="Enter city name (e.g., New York, London, Tokyo)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="py-3"
          style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px", paddingLeft: "20px" }}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px", paddingRight: "20px" }}
        >
          <i className="fas fa-search me-2"></i>
          {isSubmitting ? "Searching..." : "Search"}
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar
