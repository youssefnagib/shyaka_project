import { useState, useEffect } from "react";

const OrderUserModel = (url) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    setIsWaiting(true);

    // Fetch orders from the API
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => {
        // Ensure that the orders data is an array
        if (Array.isArray(data.orders)) {
          setOrders(data.orders); // Set orders only if it's an array
        } else {
          setOrders([]); // Set orders to an empty array if the data is invalid
        }
        setIsWaiting(false);
      })
      .catch(err => {
        setServerError(err.message);
        setIsWaiting(false);
      });
  }, [url, token]);

  return { isWaiting, serverError, orders };
};

export default OrderUserModel;
