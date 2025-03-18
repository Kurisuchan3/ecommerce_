import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaShoppingCart, FaBoxOpen, FaWarehouse, FaTimesCircle,
  FaUsers, FaUserFriends, FaStar, FaStore, FaBars
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user")); // Get user data from sessionStorage

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/orders" },
    ...(user && user.role === "admin" ? [{ name: "Products", icon: <FaBoxOpen />, path: "/products" }] : []),
    ...(user && user.role === "customer" ? [{ name: "Products", icon: <FaBoxOpen />, path: "/customer/products" }] : []),

    // { name: "Products", icon: <FaBoxOpen />, path: "/products" },
    { name: "Inventory", icon: <FaWarehouse />, path: "/inventory" },
    { name: "Cancellation Requests", icon: <FaTimesCircle />, path: "/cancellation-requests" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
    { name: "Customers", icon: <FaUserFriends />, path: "/customers" },
    { name: "Reviews", icon: <FaStar />, path: "/reviews" },
    { name: "Shop Here", icon: <FaStore />, path: "/shop" }
    // { name: "Shop Here", icon: <FaStore />, path: "/shop" }
  ];

  return (
    <>
      {/* Burger Button - Only Visible on Mobile */}
      <button className="burger-menu btn d-md-none" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Top Logo Section */}
        {/* <div className="sidebar-header">
          <h2 className="logo">LAPNIX</h2>
        </div> */}

        {/* Navigation Links */}
        <ul className="nav flex-column">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${location.pathname === item.path ? "active-link" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="me-2">{item.icon}</span> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
