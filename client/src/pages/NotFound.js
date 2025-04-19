import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center not-found-container">
        <Col md={8}>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="d-flex justify-content-center">
            <Button as={Link} to="/" variant="primary" size="lg" className="px-5 py-3">
              <i className="fas fa-home me-2"></i>
              Return to Homepage
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
