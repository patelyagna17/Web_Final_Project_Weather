import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="mb-3">
              <i className="fas fa-cloud-sun me-2"></i>
              Weather Forecast App
            </h5>
            <p className="mb-3">
              Get accurate weather forecasts for any location worldwide with our powerful and user-friendly weather
              application.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
          <Col md={4} lg={2} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">
                  <i className="fas fa-chevron-right me-1"></i> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none">
                  <i className="fas fa-chevron-right me-1"></i> About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none">
                  <i className="fas fa-chevron-right me-1"></i> Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} lg={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Features</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-check me-1"></i> Real-time Weather Updates
              </li>
              <li className="mb-2">
                <i className="fas fa-check me-1"></i> 5-Day Forecasts
              </li>
              <li className="mb-2">
                <i className="fas fa-check me-1"></i> Favorite Cities
              </li>
              <li className="mb-2">
                <i className="fas fa-check me-1"></i> Weather Maps
              </li>
            </ul>
          </Col>
          <Col md={4} lg={3}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i> 123 Weather Street, Forecast City
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i> (123) 456-7890
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i> info@weatherforecast.com
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4 mb-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Weather Forecast App. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
