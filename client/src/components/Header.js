"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import AuthContext from "../context/AuthContext"

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setExpanded(false)
  }

  return (
    <Navbar bg="white" variant="light" expand="lg" sticky="top" className="shadow-sm py-3" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <i className="fas fa-cloud-sun me-2"></i>
          <span className="fw-bold">Weather</span>
          <span className="text-primary">Forecast</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              <i className="fas fa-home me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
              <i className="fas fa-info-circle me-1"></i> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>
              <i className="fas fa-envelope me-1"></i> Contact
            </Nav.Link>

            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <NavDropdown
                    title={
                      <>
                        <i className="fas fa-shield-alt me-1"></i> Admin
                      </>
                    }
                    id="admin-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/admin" onClick={() => setExpanded(false)}>
                      <i className="fas fa-tachometer-alt me-1"></i> Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users" onClick={() => setExpanded(false)}>
                      <i className="fas fa-users me-1"></i> Manage Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/cities" onClick={() => setExpanded(false)}>
                      <i className="fas fa-city me-1"></i> Manage Cities
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user-circle me-1"></i> {user?.name || "Account"}
                    </span>
                  }
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>
                    <i className="fas fa-user me-1"></i> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  onClick={() => setExpanded(false)}
                  className="btn btn-primary text-black ms-2 px-3"
                >
                  <i className="fas fa-user-plus me-1"></i> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
