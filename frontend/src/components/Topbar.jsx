// src/components/Topbar.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import axios from "axios";

const Topbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch user info when the component mounts
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
      {/* <Button variant="light" className="d-lg-none me-3" onClick={toggleSidebar}>
        <FaBars />
      </Button> */}
      <Navbar.Brand href="#">LAPNIX</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="d-flex align-items-center">
              {/* <Image src="https://via.placeholder.com/40" roundedCircle width="40" height="40" className="me-2" /> */}
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;
