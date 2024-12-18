import { useState, useEffect } from "react";

const ProductModel = (url) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Trigger API call after a delay
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong, please try again later.");
          }
          return response.json();
        })
        .then((data) => {
          // Ensure 'products' exists and is an array
          if (Array.isArray(data.products)) {
            setProducts(data.products);
            setIsWaiting(false);
          } else {
            setServerError("Unexpected response format");
          }
        })
        .catch((err) => {
          setServerError(err.message);
          setIsWaiting(false);
        });
    }, 1000); // Adding a slight delay to simulate loading
  }, [url]);

  return {
    isWaiting,
    serverError,
    products,
    setIsWaiting,
    setServerError,
    setProducts,
  };
};

export default ProductModel;
