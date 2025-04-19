"use client"

import { useState, useEffect } from "react"
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import axios from "axios"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      // Use the correct port (3080) and add authorization header
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }

      const res = await axios.get("http://localhost:3080/api/admin/users", config)

      if (res.data && res.data.success) {
        setUsers(res.data.data || [])
      } else {
        throw new Error("Invalid response format")
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users. Please check your connection and permissions.")
      toast.error("Failed to load users")
      setLoading(false)
    }
  }

  const handleEditClick = (user) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    })
    setShowEditModal(true)
  }

  const handleDeleteClick = (user) => {
    setCurrentUser(user)
    setShowDeleteModal(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use the correct port (3080) and add authorization header
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }

      await axios.put(`http://localhost:3080/api/admin/users/${currentUser._id}`, formData, config)
      setShowEditModal(false)
      toast.success("User updated successfully")
      fetchUsers()
    } catch (err) {
      console.error("Error updating user:", err)
      setError(err.response?.data?.message || "Failed to update user")
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      // Use the correct port (3080) and add authorization header
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }

      await axios.delete(`http://localhost:3080/api/admin/users/${currentUser._id}`, config)
      setShowDeleteModal(false)
      toast.success("User deleted successfully")
      fetchUsers()
    } catch (err) {
      console.error("Error deleting user:", err)
      toast.error("Failed to delete user")
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Manage Users</h1>
        <Spinner />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Manage Users</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Manage Users</h1>

      {users.length === 0 ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={onChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={onChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={onChange} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete User Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the user <strong>{currentUser?.name}</strong>?
          </p>
          <p>This action cannot be undone and will also delete all of the user's saved cities.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AdminUsers
