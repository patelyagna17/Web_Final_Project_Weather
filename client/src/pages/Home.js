"use client"

import { useContext, useState, useEffect } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import CityList from "../components/CityList"
import Spinner from "../components/Spinner"
import WeatherContext from "../context/WeatherContext"
import AuthContext from "../context/AuthContext"
import { toast } from "react-toastify"

const Home = () => {
  const { getWeatherByCity, currentWeather, loading } = useContext(WeatherContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [popularCities, setPopularCities] = useState([])
  const [loadingPopular, setLoadingPopular] = useState(true)

  // Popular cities to display on homepage
  const cities = ["New York", "London", "Tokyo", "Sydney", "Paris", "Dubai"]

  useEffect(() => {
    const fetchPopularCities = async () => {
      try {
        const weatherPromises = cities.map((city) =>
          fetch(`http://localhost:3080/api/weather/${city}`)
            .then((res) => res.json())
            .then((data) => ({ city, data: data.data }))
            .catch(() => null),
        )

        const results = await Promise.all(weatherPromises)
        const validResults = results.filter((result) => result && result.data)

        setPopularCities(validResults)
        setLoadingPopular(false)
      } catch (error) {
        toast.error("Failed to load popular cities")
        setLoadingPopular(false)
      }
    }

    fetchPopularCities()
  }, [])

  return (
    <Container>
      <div className="hero-section mb-5">
        <div className="hero-content text-center py-5">
          <h1 className="hero-title">Weather Forecast App</h1>
          <p className="hero-subtitle">Get accurate weather forecasts for any location worldwide</p>
          <div className="mx-auto" style={{ maxWidth: "600px" }}>
            <SearchBar />
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <Row className="mb-5 fade-in">
          <Col>
            <Card className="shadow-sm">
              <Card.Header as="h5">
                <i className="fas fa-star me-2"></i>
                Your Favorite Cities
              </Card.Header>
              <Card.Body>
                <CityList />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className="mb-5">
        <Col>
          <h2 className="mb-4 d-flex align-items-center">
            <i className="fas fa-globe-americas me-2 text-primary"></i>
            Popular Cities Around the World
          </h2>
          {loadingPopular ? (
            <Spinner />
          ) : (
            <Row xs={1} sm={2} md={3} className="g-4">
              {popularCities.map((item, index) => (
                <Col key={item.city} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <WeatherCard weather={item.data.list[0]} city={item.city} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3 text-center">Why Choose Our Weather App?</h3>
              <Row xs={1} md={3} className="g-4 text-center">
                <Col>
                  <div className="feature-item">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-bolt fa-3x text-primary"></i>
                    </div>
                    <h4>Real-time Updates</h4>
                    <p>Get the latest weather information with our real-time data updates.</p>
                  </div>
                </Col>
                <Col>
                  <div className="feature-item">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-map-marked-alt fa-3x text-primary"></i>
                    </div>
                    <h4>Global Coverage</h4>
                    <p>Access weather forecasts for any location around the world.</p>
                  </div>
                </Col>
                <Col>
                  <div className="feature-item">
                    <div className="feature-icon mb-3">
                      <i className="fas fa-chart-line fa-3x text-primary"></i>
                    </div>
                    <h4>Detailed Forecasts</h4>
                    <p>View detailed 5-day forecasts with hourly predictions.</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
