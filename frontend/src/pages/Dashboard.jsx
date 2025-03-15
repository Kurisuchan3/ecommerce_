// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {Navbar, Nav, Dropdown, Card, Button, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaWarehouse, FaTimesCircle,
  FaUsers, FaUserFriends, FaStar, FaStore, FaDollarSign
} from "react-icons/fa";
import Users from "./Users"; // Adjust the path if needed
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container fluid className="p-0">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Row className="vh-100">
        <Col md={3} className={sidebarOpen ? "sidebar-open" : ""}>
          <Sidebar />
        </Col>
                <Col md={9} className="p-4 bg-light">
                  <h2 className="text-primary">Dashboard Overview</h2>
                    {/* <Users /> */}
                  <Row>
                    {[
                      { title: "Total Users", icon: <FaUsers />, value: "100" },
                      { title: "Orders", icon: <FaShoppingCart />, value: "250" },
                      { title: "Revenue", icon: <FaPesoSign />, value: "₱10,000" }
                    ].map((card, index) => (
                      <Col md={4} sm={6} xs={12} key={index} className="mb-3">
                        <Card className="shadow-sm border-0" style={{ backgroundColor: "#F3F4F6" }}>
                          <Card.Body className="text-center">
                            <Card.Title className="text-primary">{card.icon} {card.title}</Card.Title>
                            <Card.Text className="fw-bold">{card.value}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
