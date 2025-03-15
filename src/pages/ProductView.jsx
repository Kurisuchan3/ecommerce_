import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const ProductView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]); // Ensure useEffect runs when ID changes

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/view_product/${id}`);

      if (response.data && Object.keys(response.data).length > 0) {
        setProduct(response.data);
      } else {
        setError("Product not found.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Product not found or API error.");
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading product details...</h3>;
  if (error) return <h3 className="text-danger">{error}</h3>;
  if (!product) return <h3 className="text-danger">Product not found.</h3>;

  return (
    <Container fluid className="p-0">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Row className="vh-100">
        {/* Sidebar */}
        <Col md={3} className={sidebarOpen ? "sidebar-open" : ""}>
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2 className="text-primary mb-4">Product Details</h2>

          <Card className="p-4">
            <Row className="align-items-center">
              {/* Image Section - Left Side */}
              <Col md={4} className="text-center">
                {product?.image ? (
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt={product.product_name}
                    className="img-fluid rounded"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </Col>

              {/* Product Details - Right Side */}
              <Col md={8}>
                <h2 className="text-primary">{product?.product_name || "N/A"}</h2>
                <h5 className="text-muted">Brand: {product?.brand || "N/A"}</h5>
                <h4 className="text-success mt-3">
                  ₱{product?.price ? Number(product.price).toFixed(2) : "0.00"}
                </h4>
                <p><strong>Stock Quantity:</strong> {product?.quantity || 0}</p>
              </Col>
            </Row>

            {/* Description */}
            <Row className="mt-4">
              <Col>
                <h5>Description</h5>
                <p>{product?.description || "No description available."}</p>
              </Col>
            </Row>

            {/* Specifications */}
            <Row className="mt-3">
              <Col>
                <h5>Specifications</h5>
                <p>{product?.specification || "No specifications available."}</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
