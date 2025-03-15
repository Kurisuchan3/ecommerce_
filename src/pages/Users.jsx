import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);


  const [formData, setFormData] = useState({ name: "", email: "",status: "" });


  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);
 const fetchUsers = async () => {
     try {
       const response = await axios.get("http://localhost:8000/api/users");
       setUsers(response.data); // ✅ Store API data in state
      //  console.log("Fetched Products:", response.data); // Debugging line
     } catch (error) {
       console.error("Error fetching users:", error);
     }
   };

// fetchUsers();


  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Edit User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Edit user API request
        await axios.put(`http://localhost:8000/api/users/${editingUser.id}`, {
          name: formData.name,
          email: formData.email,
          status: formData.status,
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
      } else {
        // Add new user API request
        await axios.post("http://localhost:8000/api/users", formData, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
      }
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };





  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open Add/Edit Modal
  const openModal = (user = null) => {
    setEditingUser(user);
    // setFormData(user ? { name: user.name, email: user.email ,status: user.status } : { name: "", email: "" ,status: "" });
    setFormData(user ? { name: user.name, email: user.email ,status: user.status } : { name: "", email: "" ,status: "" });

    setShowModal(true);
  };



  return (
    <Container fluid className="p-0">
          <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Row className="vh-100">
            <Col md={3} className={sidebarOpen ? "sidebar-open" : ""}>
              <Sidebar />
            </Col>

            <Col md={9} className="p-4 bg-light">
                  {/* <h2 className="text-primary">Dashboard Overview</h2> */}
                    {/* <Users /> */}
                <Row>
              <div className="container mt-4">
                <h2>User Management</h2>
                {/* <Button variant="primary" className="mb-3" onClick={() => openModal()}>+ Add User</Button> */}

                {/* Users Table */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                          <Button variant={user.status === "active" ? "success" : "danger"} size="sm">
                              {user.status}
                          </Button>
                          </td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => openModal(user)}>Edit</Button>

                            {/* <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                {/* Add/Edit User Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select type="text" name="status" value={formData.status} onChange={handleChange}>
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                      </Form.Select>
                      </Form.Group>
                      <Button variant="primary" type="submit">{editingUser ? "Update" : "Add"} User</Button>
                    </Form>
                  </Modal.Body>
                </Modal>




            {/* {change status} */}





              </div>

                  </Row>
                  </Col>

      </Row>
    </Container>
  );
};

export default Users;
