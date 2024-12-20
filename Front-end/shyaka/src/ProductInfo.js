import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductInfoModel from "./ProductInfoModel";
import "./ProductInfo.css";

const ProductInfo = () => {
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const { isWaiting, serverError, product } = ProductInfoModel(
    `http://localhost:8000/api/products/${id}/`
  );
  const navigate = useNavigate();

  const formatPrice = (price) =>
    price.toLocaleString("en-US", { style: "currency", currency: "EGP" });

  if (isWaiting) {
    return <div>Loading...</div>;
  }

  if (serverError) {
    return <div>Error: {serverError}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const addToCart = () => {
    if (!size || !color) {
      alert("Please select both size and color.");
      return;
    }

    const orderItem = {
      name: product.name,
      product: product.id,
      size: size,
      price: parseInt(product.price),
      color: color,
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product === orderItem.product &&
        item.size === orderItem.size &&
        item.color === orderItem.color
    );
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(orderItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product added to cart with Size: ${size}, Color: ${color}`);
    navigate("/cart");
  };

  return (
    <div className="container">
      <div className="product-info">
        <div className="product-image">
          <img
            src={"http://localhost:8000/" + product.image || "placeholder.jpg"}
            alt={product.name}
          />
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-description">{product.description}</p>

          <div className="options">
            <label htmlFor="size">Size</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">X-Large</option>
            </select>

            <label htmlFor="color">Color</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">Select Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div className="add-to-cart">
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
