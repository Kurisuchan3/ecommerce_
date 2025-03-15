import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, InputGroup} from "react-bootstrap";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
     const [sidebarOpen, setSidebarOpen] = useState(false);

    const [products, setProducts] = useState([]); // ✅ Ensure products state exists

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data); // ✅ Store API data in state
      console.log("Fetched Products:", response.data); // Debugging line
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (

    <Container fluid className="p-0">
    <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    <Row className="vh-100">
      <Col md={3} className={sidebarOpen ? "sidebar-open" : ""}>
        <Sidebar />
      </Col>
        <Col md={9}>
          <Row className="justify-content-center">
            <div className="container mt-4">
            <h2 className="text-primary">Product List</h2>
            <Link to={`/AddProduct`}>
                        <Button variant="success" size="lg">Add Product</Button>
                    </Link>{" "}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => ( // ✅ Ensure product is defined inside map()
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                {/* Display product image before product name */}
                <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt={product.product_name}
                    width="50"
                    height="50"
                    style={{ objectFit: "cover", marginLeft: "10px",marginRight: "10px", borderRadius: "5px", justify:"center" }}
                />
                {product.product_name}asdasdasd</td>
                <td>{product.brand || "N/A"}</td>
                {/* <td>₱{product.price.toFixed(2)}</td> */}
                <td>₱{product.price ? Number(product.price).toFixed(2) : "0.00"}</td>

                <td>{product.quantity}</td>
                <td>
                    {/* View Button - Links to View Product Page */}
                    <Link to={`/view_product/${product.id}`}>
                        <Button variant="info" size="sm">View</Button>
                    </Link>{" "}
                      {/* Edit Button - Links to Edit Product Page */}
                    <Link to={`/editproduct/${product.id}`}>
                        <Button variant="warning" size="sm">Edit</Button>
                    </Link>{" "}
                    {/* <Button variant="danger" size="sm"
                    onClick={() => handleDelete(product.id)}>Delete </Button> */}
                  {/* <Button variant="info" size="sm">View</Button>{" "}
                  <Button variant="warning" size="sm">Edit</Button>{" "}*/}
                  {<Button variant="danger" size="sm">Delete</Button>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    </Row>
    </Col>
    </Row>
    </Container>
  );
};

export default ProductList;
