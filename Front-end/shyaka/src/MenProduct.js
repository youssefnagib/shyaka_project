import React from "react";
import ProductModel from "./ProductModel";
import { Link } from "react-router-dom";

const MenProducts = () => {
  const { isWaiting, serverError, products } = ProductModel(
    "http://127.0.0.1:8000/api/products/men/"
  );

  // Conditional rendering based on loading state and errors
  if (isWaiting) {
    return <div>Loading products...</div>;
  }

  if (serverError) {
    return <div>Error: {serverError}</div>;
  }

  return (
    <div>
      <header style={headerStyles}>
        <h1>Men's Collection</h1>
      </header>
      <div style={containerStyles}>
        <h2 style={sectionTitleStyles}>Explore Our Latest Men's Fashion</h2>
        <div style={productsContainerStyles}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} style={productCardStyles}>
                <img
                  src={'http://127.0.0.1:8000'+product.image}
                  alt={product.name}
                  style={productImageStyles}
                />
                <h3 style={productNameStyles}>{product.name}</h3>
                <p style={productDescriptionStyles}>{product.description}</p>
                <p style={productPriceStyles}>{product.price} LE</p>
                <Link to={"/product/" + product.id + "/"} href="#" style={productLinkStyles}>
                                  View Details
                                </Link>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
      <footer style={footerStyles}>
        <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Styles (converted to camelCase for JSX)
const headerStyles = {
  backgroundColor: "#858282",
  color: "white",
  textAlign: "center",
  padding: "20px 0",
};

const containerStyles = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const sectionTitleStyles = {
  textAlign: "center",
  fontSize: "28px",
  marginBottom: "20px",
  color: "#5a5252",
};

const productsContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const productCardStyles = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(117, 111, 111, 0.1)",
  width: "300px",
  textAlign: "center",
  padding: "15px",
  transition: "transform 0.3s, boxShadow 0.3s",
};

const productImageStyles = {
  width: "100%",
  borderRadius: "8px",
  height: "auto",
};

const productNameStyles = {
  fontSize: "20px",
  color: "#222",
  margin: "15px 0 10px",
};

const productDescriptionStyles = {
  fontSize: "16px",
  color: "#777",
  marginBottom: "10px",
};

const productPriceStyles = {
  fontSize: "18px",
  color: "#e74c3c",
  fontWeight: "bold",
  marginBottom: "15px",
};

const productLinkStyles = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  transition: "backgroundColor 0.3s",
};

const footerStyles = {
  backgroundColor: "#a8a2a2",
  color: "white",
  textAlign: "center",
  padding: "10px 0",
  marginTop: "20px",
};

export default MenProducts;
