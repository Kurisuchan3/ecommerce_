import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import React from "react";
import Register from "./pages/Register";  // Import Register Page
import Login from "./pages/Login";  // Import Login Page
import Dashboard from "./pages/Dashboard";    // Create a Dashboard Page
import Users from "./pages/Users";    // Create a users Page
import AddProduct from "./pages/AddProduct";    // Create a product Page
import EditProduct from "./pages/EditProduct";    // Create a product Page
import Products from "./pages/Product_list";    // Create a product Page
import ProductView from "./pages/ProductView";    // Create a product


import ProductList from "./pages/customer/Product_list";
import Cart from "./pages/customer/Cart";


function App() {
  return (

<Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/products" element={<Products />} />
      <Route path="/view_product/:id" element={<ProductView />} />

      <Route path="/customer/products" element={<ProductList />} />
      <Route path="/customer/cart" element={<Cart />} />
  </Routes>
  );
}

export default App;
