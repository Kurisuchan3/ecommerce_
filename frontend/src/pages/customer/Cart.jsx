import Topbar from "../customer/Topbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/cart");
            setCartItems(response.data);
            console.log("Fetched Cart Items:", response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}`);
            setCartItems(cartItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    return (
        <Container fluid className="p-0">
            <Topbar />
            <Row className="justify-content-center">
                <Col md={9}>
                    <div className="container mt-4">
                        <h2 className="text-primary">Shopping Cart</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:8000/storage/${item.product.image}`}
                                                    alt={item.product.product_name}
                                                    width="50"
                                                    height="50"
                                                    style={{ objectFit: "cover", marginRight: "10px", borderRadius: "5px" }}
                                                />
                                                {item.product.product_name}
                                            </td>
                                            <td>₱{item.product.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>₱{(item.product.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No items in cart</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
