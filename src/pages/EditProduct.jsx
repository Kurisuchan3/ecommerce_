import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link,useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    specification: "",
    image: null,
  });

  // Fetch product details when component loads
  useEffect(() => {
    if (!id) return; // Ensure ID is available before fetching

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/editproduct/${id}`);

        if (response.data) {
          setFormData({
            product_name: response.data.product_name || "",
            brand: response.data.brand || "",
            price: response.data.price || "",
            quantity: response.data.quantity || 1,
            description: response.data.description || "",
            specification: response.data.specification || "",
            image: null, // Keep image null to prevent overriding
          });
        } else {
          console.warn("Product data is empty.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`http://localhost:8000/api/editproduct/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" },
         params: { _method: "PUT" }, // Laravel method spoofing
      }
      );

      alert(response.data.message || "Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      alert("Failed to edit product. Check console for details.");
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
          <h2 className="text-primary mb-4">Update Product</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow p-4">
                <Form onSubmit={handleSubmit}>
                  {/* Product Image */}
                  <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={handleChange} />
                  </Form.Group>

                  {/* Product Name & Brand */}
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="product_name" className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="product_name"
                          value={formData.product_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="brand" className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Price & Quantity */}
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="price" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>₱</InputGroup.Text>
                          <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quantity" className="mb-3">
                        <Form.Label>Quantity Available</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Description */}
                  <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Specification */}
                  <Form.Group controlId="specification" className="mb-3">
                    <Form.Label>Specification</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="specification"
                      value={formData.specification}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button type="submit" variant="primary" className="w-100">
                    Update Product
                  </Button>
                  {/* <Link to={`/products`}>
                        <Button variant="primary" size="lg">Update Product</Button>
                    </Link>{" "} */}
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
