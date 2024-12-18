import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductInfo.css"
import ProductInfoModel from "./ProductInfoModel";

const ProductInfo = () => {
  const { id } = useParams();
  const [size, setSize] = useState("small");
  const [color, setColor] = useState("black");
  const { isWaiting, serverError, product } = ProductInfoModel(
    `http://localhost:8000/api/products/${id}/`
  );

  const addToCart = () => {
    alert(`Product added to cart with Size: ${size}, Color: ${color}`);
  };

  if (isWaiting) {
    return <div>Loading...</div>; // Show loading message while waiting
  }

  if (serverError) {
    return <div>Error: {serverError}</div>; // Show error message if there's a server issue
  }

  // Ensure product data is available before rendering
  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="container">
      <div className="product-info">
        {/* Product Image */}
        <div className="product-image">
          <img src={"http://localhost:8000/" + product.image} alt={product.name} />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>

          {/* Options */}
          <div className="options">
            <label htmlFor="size">Size</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
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
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <div className="add-to-cart">
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
