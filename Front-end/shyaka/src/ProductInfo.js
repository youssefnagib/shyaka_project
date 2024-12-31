import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductInfoModel from "./ProductInfoModel";
import "./ProductInfo.css";
import LOADING from "./loading.gif"

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
    return (
      <div style={loading}>
        <img src={LOADING} alt="loading" style={loadingImageStyles} />
      </div>
    );;
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
    console.log(orderItem);

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
    
    let alertcart = localStorage.getItem('alertcart')
    if (alertcart){
      localStorage.removeItem('alertcart');
      localStorage.setItem('alertcart', parseInt(alertcart) +1 );
    }else{
      localStorage.setItem('alertcart', 1 );
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product added to cart with Size: ${size}, Color: ${color}`);
    navigate("/products");
    window.location.reload();
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
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="X-Large">X-Large</option>
            </select>

            <label htmlFor="color">Color</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">Select Color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Gray">Gray</option>
              <option value="CAFE">CAFE</option>

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

// styles 
const loadingImageStyles = {
  justifyContent: "center",
  alignSelf: "center",
  width: "25%",
  textAlign: "center",
  borderRadius: "8px",
  height: "auto",
};

const loading = {
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  height: "550px",
};

export default ProductInfo;
