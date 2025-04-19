import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const WeatherCard = ({ weather, city }) => {
  if (!weather) return null

  const temp = Math.round(weather.main.temp)
  const description = weather.weather[0].description
  const icon = weather.weather[0].icon
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

  // Get weather condition for styling
  const condition = weather.weather[0].main.toLowerCase()

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

  // Determine text color based on condition
  const isDark = ["rain", "thunderstorm", "mist"].includes(condition)
  const textColor = isDark ? "white" : "inherit"

  return (
    <Card className="h-100 shadow-sm hover-effect">
      <Card.Body className="text-center" style={{ background: gradient, color: textColor }}>
        <Card.Title className="mb-3 fw-bold">{city}</Card.Title>
        <div className="d-flex justify-content-center">
          <img src={iconUrl || "/placeholder.svg"} alt={description} className="weather-icon mb-2" />
        </div>
        <h2 className="mb-0 display-4 fw-bold">{temp}°F</h2>
        <Card.Text className="text-capitalize mb-3">{description}</Card.Text>
        <div className="d-flex justify-content-between mt-3">
          <div>
            <small className={isDark ? "text-white-50" : "text-muted"}>Humidity</small>
            <p className="mb-0 fw-bold">{weather.main.humidity}%</p>
          </div>
          <div>
            <small className={isDark ? "text-white-50" : "text-muted"}>Wind</small>
            <p className="mb-0 fw-bold">{Math.round(weather.wind.speed)} mph</p>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0 text-center p-3">
        <Link to={`/forecast/${city}`} className="btn btn-primary w-100">
          <i className="fas fa-chart-line me-2"></i>
          View Detailed Forecast
        </Link>
      </Card.Footer>
    </Card>
  )
}

export default WeatherCard
