import React, { useState } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    city: "",
    zip_code: "",
    address: "",
    country: "",
    phone_number: "",
    order_items: JSON.parse(localStorage.getItem("cart")) || [],
  });
  const token = localStorage.getItem("access_token");
  const nevgate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/orders/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        nevgate("/")
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return formData.order_items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  console.log(formData)



  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <div className="total">
          <strong>Total: {calculateTotal().toLocaleString("en-US", {
            style: "currency",
            currency: "EGP",
          })}</strong>
        </div>
        <button type="submit"> Place Order </button>
      </form>
    </div>
  );
};

export default Checkout;
