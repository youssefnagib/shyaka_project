import { useState, useEffect } from 'react';

const OrderInfoModel = (url) => {
  // Define states for loading, data, and errors
  const [order, setOrders] = useState(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [serverError, setServerError] = useState(null);
  const token = localStorage.getItem('access_token');

  // Fetch the order data from the provided URL
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }});
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOrders(data.order);
      } catch (error) {
        setServerError(error.message);
      } finally {
        setIsWaiting(false); // End loading state
      }
    };

    fetchOrderData();
  }, [url, token]); // Run the effect only when the URL changes

  // Return the states (orders, isWaiting, and serverError)
  return { order, isWaiting, serverError };
};

export default OrderInfoModel;
