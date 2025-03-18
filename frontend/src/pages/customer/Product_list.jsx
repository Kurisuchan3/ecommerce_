import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

import Topbar from "../customer/Topbar";
// import "../../styles/Product.css"; // Import CSS for styling

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
         <Topbar />
          {/* <Row className="vh-100"> */}


        {/* Main Content */}
        {/* <Col md={sidebarOpen ? 9 : 12} className="p-4"> */}
        <br></br> <h2 className="text-primary mb-4 text-center">Gadget Store</h2> <br></br>
          <Row className="justify-content-center mx-4 px-3">
  {products.length > 0 ? (
    products.map((product) => (
      <Col key={product.id} lg={3} md={4} sm={6}  className="mb-3 d-flex justify-content-center">
        <Card className="h-100 shadow-sm" style={{ width: "18rem" }}>
          <Link to={`/view_product/${product.id}`} className="text-decoration-none">
            <Card.Img
              variant="top"
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.product_name}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </Link>
          <Card.Body className="text-center">
            <Card.Title style={{ fontSize: "0.9rem" }}>{product.product_name}</Card.Title>
            <Card.Text className="text-muted">{product.price}</Card.Text>
            <div>{renderStars(product.rating)}</div>
            <Button variant="primary" size="sm" onClick={() => addToCart(product.id)}>
              Add to Cart
            </Button>
            {/* <Link to={`/editproduct/${product.id}`}>
              <Button variant="primary" size="sm">Edit</Button>
            </Link>{" "} */}
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p className="text-center w-100">No products available</p>
  )}
</Row>


        {/* </Col> */}
      {/* </Row> */}
    </Container>
  );
};

export default ProductList;
