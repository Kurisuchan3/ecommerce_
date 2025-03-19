// src/components/Topbar.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog, FaShoppingCart, FaBox, FaHome, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import "../../styles/Topbar.css"; // Import CSS for styling

const Topbar = ({ toggleSidebar }) => {
  const user_id = JSON.parse(sessionStorage.getItem("user")); // Get user data from sessionStorage
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  };

  return (
    <Navbar style={{ backgroundColor: "rgb(35, 132, 230)" }} variant="dark" expand="lg" className="px-4">
      <Navbar.Brand href="#">LAPNIX</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-center">
        <Nav className="px-3">
        <Nav.Link as={NavLink} to="/home" className="nav-link-custom px-3">
        Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/home" className="nav-link-custom px-3">
          Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/home" className="nav-link-custom px-3">
          Orders
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/customer/cart/${user_id.id}`} className="nav-link-custom px-3">
            Cart
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" className="d-flex align-items-center">
            <span>Welcome, {user?.name || "Guest"}!</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#"><FaUserCircle className="me-2" /> Profile</Dropdown.Item>
            <Dropdown.Item href="#"><FaCog className="me-2" /> Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}><FaSignOutAlt className="me-2" /> Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Topbar;
