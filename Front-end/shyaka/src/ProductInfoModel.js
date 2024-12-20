import { useState, useEffect } from "react";

const ProductsInfoModel = (url) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [product, setProduct] = useState(null); // Change 'products' to 'product' for a single item

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong, please try again later.");
          }
          return response.json();
        })
        .then((data) => {
          
          // Check if 'products' exists in the data and access its properties
          if (data && data.products) {
            setProduct(data.products); // Set the 'products' object
            setIsWaiting(false);
          } else {
            setServerError("Unexpected response format");
            setIsWaiting(false);
          }
        })
        .catch((err) => {
          setServerError(err.message);
          setIsWaiting(false);
        });
    }, 2000); // Adding a slight delay to simulate loading

    // Cleanup the timeout when the component unmounts or before a new effect runs
    return () => clearTimeout(timer);
  }, [url]);

  return {
    isWaiting,
    serverError,
    product, // Return the product object
  };
};

export default ProductsInfoModel;
