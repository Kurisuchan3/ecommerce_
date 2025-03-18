import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "active",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
    const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // const response = await axios.post("http://localhost:8000/api/login", {
    //     email,
    //     password,
    //   });

    try {
      await axios.post("http://localhost:8000/api/register", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      setSuccess("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err.response); // Log error response
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">

        <Card.Body>
        <br></br><br></br> <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option> {/* Prevent empty value */}
                <option value="seller">seller</option>
                <option value="customer">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name="status" value={formData.status} onChange={handleChange} required />
          </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />

            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Register</Button>
          </Form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
