"use client"

import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Alert, Tab, Tabs, Badge } from "react-bootstrap"
import { useParams } from "react-router-dom"
import WeatherContext from "../context/WeatherContext"
import AuthContext from "../context/AuthContext"
import Spinner from "../components/Spinner"
import ForecastChart from "../components/ForecastChart"
import { toast } from "react-toastify"

const ForecastDetails = () => {
  const { city } = useParams()
  const { getWeatherByCity, currentWeather, forecast, loading, addFavoriteCity, favoriteCities } =
    useContext(WeatherContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        await getWeatherByCity(city)
        setError("")
      } catch (err) {
        setError("City not found. Please check the spelling and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [city, getWeatherByCity])

  useEffect(() => {
    // Check if city is already in favorites
    if (favoriteCities.length > 0) {
      const cityInFavorites = favoriteCities.some((favCity) => favCity.name.toLowerCase() === city.toLowerCase())
      setIsFavorite(cityInFavorites)
    }
  }, [favoriteCities, city])

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add cities to favorites")
      return
    }

    try {
      setIsAdding(true)
      await addFavoriteCity({
        name: city,
        country: currentWeather?.sys?.country || "Unknown",
      })
      setIsFavorite(true)
      toast.success(`${city} added to favorites`)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add city to favorites")
    } finally {
      setIsAdding(false)
    }
  }

  if (loading || isLoading) {
    return (
      <Container className="py-4">
        <div className="loading-spinner">
          <Spinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      </Container>
    )
  }

  if (!currentWeather || !forecast) {
    return (
      <Container className="py-4">
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No weather data available.
        </Alert>
      </Container>
    )
  }

  const temp = Math.round(currentWeather.main.temp)
  const description = currentWeather.weather[0].description
  const icon = currentWeather.weather[0].icon
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  const forecastDays = Object.keys(forecast)

  // Get weather condition for styling
  const condition = currentWeather.weather[0].main.toLowerCase()

  // Define gradient backgrounds based on weather condition
  const gradients = {
    clear: "linear-gradient(135deg, #56CCF2, #2F80ED)",
    clouds: "linear-gradient(135deg, #E0E0E0, #B0BEC5)",
    rain: "linear-gradient(135deg, #536976, #292E49)",
    snow: "linear-gradient(135deg, #E0EAFC, #CFDEF3)",
    thunderstorm: "linear-gradient(135deg, #4B79A1, #283E51)",
    drizzle: "linear-gradient(135deg, #89F7FE, #66A6FF)",
    mist: "linear-gradient(135deg, #606c88, #3f4c6b)",
    default: "linear-gradient(135deg, #3498db, #2980b9)",
  }

  // Select gradient based on condition or use default
  const gradient = gradients[condition] || gradients.default

  return (
    <Container className="py-4 fade-in">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h1 className="mb-3">
              <i className="fas fa-map-marker-alt me-2 text-primary"></i>
              {city}
              {currentWeather.sys?.country && (
                <Badge bg="secondary" className="ms-2">
                  {currentWeather.sys.country}
                </Badge>
              )}
            </h1>

            {isAuthenticated && !isFavorite && (
              <Button variant="outline-primary" onClick={handleAddToFavorites} className="mb-3" disabled={isAdding}>
                {isAdding ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="far fa-heart me-2"></i> Add to Favorites
                  </>
                )}
              </Button>
            )}

            {isFavorite && (
              <Alert variant="success" className="d-inline-block mb-3 py-2 px-3">
                <i className="fas fa-heart me-2 text-danger"></i> This city is in your favorites
              </Alert>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm current-weather-card" style={{ background: gradient }}>
            <Card.Body className="text-center">
              <h3 className="mb-3">Current Weather</h3>
              <div className="d-flex justify-content-center">
                <img
                  src={iconUrl || "/placeholder.svg"}
                  alt={description}
                  className="weather-icon"
                  style={{ width: "120px" }}
                />
              </div>
              <h2 className="display-3 fw-bold">{temp}°F</h2>
              <p className="lead text-capitalize mb-4">{description}</p>

              <Row className="mt-4">
                <Col xs={6}>
                  <div className="mb-3">
                    <small className="text-muted d-block">Humidity</small>
                    <span className="fs-5 fw-bold">{currentWeather.main.humidity}%</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="mb-3">
                    <small className="text-muted d-block">Wind</small>
                    <span className="fs-5 fw-bold">{Math.round(currentWeather.wind.speed)} mph</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="mb-3">
                    <small className="text-muted d-block">Pressure</small>
                    <span className="fs-5 fw-bold">{currentWeather.main.pressure} hPa</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="mb-3">
                    <small className="text-muted d-block">Feels Like</small>
                    <span className="fs-5 fw-bold">{Math.round(currentWeather.main.feels_like)}°F</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h3 className="mb-4">5-Day Forecast</h3>
              <ForecastChart forecast={forecast} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3">Detailed Forecast</h3>

              <Tabs defaultActiveKey={forecastDays[0]} className="mb-3 forecast-tabs">
                {forecastDays.map((day) => (
                  <Tab
                    key={day}
                    eventKey={day}
                    title={new Date(day).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  >
                    <Row xs={1} md={2} lg={4} className="g-4">
                      {forecast[day].map((item, index) => {
                        const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        const temp = Math.round(item.main.temp)
                        const icon = item.weather[0].icon
                        const description = item.weather[0].description
                        const condition = item.weather[0].main.toLowerCase()
                        const gradient = gradients[condition] || gradients.default
                        const isDark = ["rain", "thunderstorm", "mist"].includes(condition)

                        return (
                          <Col key={index} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                            <Card className="h-100 shadow-sm">
                              <Card.Header
                                className="text-center"
                                style={{ background: gradient, color: isDark ? "white" : "inherit" }}
                              >
                                <h5 className="mb-0">{time}</h5>
                              </Card.Header>
                              <Card.Body className="text-center">
                                <img
                                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                  alt={description}
                                  className="mb-2"
                                />
                                <h4 className="fw-bold">{temp}°F</h4>
                                <p className="text-capitalize mb-3">{description}</p>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <small className="text-muted d-block">Humidity</small>
                                    <span className="fw-bold">{item.main.humidity}%</span>
                                  </div>
                                  <div>
                                    <small className="text-muted d-block">Wind</small>
                                    <span className="fw-bold">{Math.round(item.wind.speed)} mph</span>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  </Tab>
                ))}
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForecastDetails
