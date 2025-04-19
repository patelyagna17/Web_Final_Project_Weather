import { Container, Row, Col, Card } from "react-bootstrap"

const About = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">About Weather Forecast App</h1>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Our Mission</h2>
              <p>
                Weather Forecast App is designed to provide accurate and reliable weather information to users
                worldwide. Our mission is to make weather forecasting accessible and easy to understand, helping people
                plan their activities with confidence.
              </p>
              <p>
                We utilize the OpenWeatherMap API to deliver up-to-date weather data for any location around the globe.
                Our user-friendly interface allows you to quickly access current conditions and 5-day forecasts for your
                favorite cities.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Features</h2>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Real-time weather updates
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  5-day weather forecasts
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Save favorite cities
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Detailed weather information
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  User-friendly interface
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Mobile responsive design
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Technology Stack</h2>
              <p>
                Our application is built using modern web technologies to ensure reliability, performance, and a great
                user experience:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fab fa-react text-primary me-2"></i>
                  <strong>Frontend:</strong> React, Bootstrap
                </li>
                <li className="mb-2">
                  <i className="fab fa-node-js text-success me-2"></i>
                  <strong>Backend:</strong> Node.js, Express.js
                </li>
                <li className="mb-2">
                  <i className="fas fa-database text-warning me-2"></i>
                  <strong>Database:</strong> MongoDB
                </li>
                <li className="mb-2">
                  <i className="fas fa-cloud text-info me-2"></i>
                  <strong>API:</strong> OpenWeatherMap
                </li>
                <li className="mb-2">
                  <i className="fas fa-lock text-danger me-2"></i>
                  <strong>Authentication:</strong> JWT, bcrypt
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-3">Our Team</h2>
              <p>
                Weather Forecast App is developed by a team of passionate developers committed to creating useful and
                intuitive applications. We continuously work to improve our service and add new features based on user
                feedback.
              </p>
              <p>
                If you have any questions, suggestions, or feedback, please don't hesitate to contact us through our{" "}
                <a href="/contact">Contact page</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About
