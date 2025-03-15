import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  {
    id: 1,
    name: "Smartphone X12",
    price: "$699",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: "$149",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Gaming Laptop G15",
    price: "$1299",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Smartwatch Series 5",
    price: "$299",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "4K Smart TV 55\"",
    price: "$799",
    image: "https://via.placeholder.com/150",
  },
];

const ProductList = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gadget Store</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
