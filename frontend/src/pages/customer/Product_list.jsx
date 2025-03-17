import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userId = 1; // Replace with authenticated user's ID

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/customer/products");
      setProducts(response.data); //
      console.log("Fetched Products:", response.data); // Debugging line
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (productId) => {
    axios.post("http://localhost:8000/api/customer/cart", {
      user_id: userId,
      product_id: productId,
      quantity: 1,
    })
    .then(response => alert("Added to cart!"))
    .catch(error => console.error("Error adding to cart:", error));
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted" />);
      }
    }
    return stars;
  };

  return (
    <Container fluid className="p-0">
          <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Row className="vh-100">
            <Col md={3} className={sidebarOpen ? "sidebar-open" : ""}>
              <Sidebar />
            </Col>

        {/* Main Content */}
        <Col md={sidebarOpen ? 9 : 12} className="p-4">
          <h2 className="text-primary mb-4 text-center">Gadget Store</h2>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
                  <Card className="h-100 shadow-sm">
                  <Link to={`/view_product/${product.id}`} className="text-decoration-none">
                      <Card.Img variant="top"
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.product_name}
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                    </Link>
                    <Card.Body className="text-center">
                      <Card.Title>{product.product_name}</Card.Title>
                      <Card.Text className="text-muted">{product.price}</Card.Text>
                      <div>{renderStars(product.rating)}</div>
                      {/* <Button variant="primary" className="mt-2">Add to Cart</Button> */}
                      <Button variant="primary" onClick={() => addToCart(product.id)}> Add to Cart </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center w-100">No products available</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
