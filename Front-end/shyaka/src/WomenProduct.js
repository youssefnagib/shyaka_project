import React, { useState, useEffect } from "react";
import ProductModel from "./ProductModel";
import { Link } from "react-router-dom";
import LOADING from "./loading.gif";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap is imported

const MenProducts = () => {
  const [maxPrice, setMaxPrice] = useState(9900);
  const [minPrice, setMinPrice] = useState(0);
  const [category, setCategory] = useState("");

  const { isWaiting, serverError, products } = ProductModel(
    "http://127.0.0.1:8000/api/products/women/"
  );

  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // Filters
  const filteredProducts = products.filter((product) => {
    return (
      (maxPrice === "" || product.price <= maxPrice) &&
      (minPrice === "" || product.price >= minPrice) &&
      (category === "" || product.category?.toLowerCase().includes(category.toLowerCase()))
    );
  });

  if (isWaiting) {
    return (
      <div style={loading}>
        <img src={LOADING} alt="loading" style={loadingImageStyles} />
      </div>
    );
  }

  if (serverError) {
    return <div>Error: {serverError}</div>;
  }
  return (
    <div style={pageContainerStyles}>
      <div style={sidebarStyles}>
        <h3>Filters</h3>
        <div>
          <label>Min Price:</label>
          <input
            type="range"
            className="form-range"
            min="1000"
            max="99000"
            step="100"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <div>Min Price: {minPrice} LE</div>
        </div>
        <div>
          <label>Max Price:</label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="9900"
            step="100"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <div>Max Price: {maxPrice} LE</div>
        </div>
        <div>
  <label>Category:</label>
  <select
    className="form-select"
    aria-label="Category select"
    value={category}
    onChange={handleCategoryChange}
  >
    <option value="">Select Category</option>
    <option value="tops">Tops</option>
    <option value="hoodie">Hoodies</option>
    <option value="jackets">Jackets</option>
    <option value="pants">Pants</option>
    <option value="dress">Dress</option>
  </select>
</div>
      </div>

      {/* Products Section */}
      <div style={productsSectionStyles}>
        <header style={headerStyles}>
          <h1>Women's Collection</h1>
        </header>
        <div style={containerStyles}>
          <h2 style={sectionTitleStyles}>Explore Our Latest Women's Fashion</h2>
          <div style={productsContainerStyles}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} style={productCardStyles}>
                  <img
                    src={'http://127.0.0.1:8000' + product.image || "default-placeholder.png"}
                    alt={product.name}
                    style={productImageStyles}
                  />
                  <h3 style={productNameStyles}>{product.name}</h3>
                  <p style={productDescriptionStyles}>{product.description}</p>
                  <p style={productPriceStyles}>{product.price} LE</p>
                  <Link to={`/product/${product.id}/`} style={productLinkStyles}>
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//styles
const pageContainerStyles = {
  display: "flex",
  flexDirection: "row",
  maxWidth: "1200px",
  margin: "0 auto",
};

const sidebarStyles = {
  flex: "0 0 25%",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)",
  height: "100vh",
};

const productsSectionStyles = {
  flex: "1",
  padding: "20px",
};

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

export default MenProducts;
