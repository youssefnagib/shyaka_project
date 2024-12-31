import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components you are using
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  // States for product and order analysis
  const [productChartData, setProductChartData] = useState(null);
  const [averagePrice, setAveragePrice] = useState(null);
  const [orderChartData, setOrderChartData] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [error, setError] = useState(null); // To capture errors

  // Fetch product data for analysis
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/');
        const data = await response.json();
        
        if (!data || !data.products) {
          setError('No product data available');
          return;
        }

        // Prepare chart data and calculate average price
        const labels = data.products.map(product => product.name);
        const prices = data.products.map(product => product.price);

        const total = data.products.reduce((sum, product) => sum + parseFloat(product.price) || 0, 0);
        const average = total / prices.length;
        setAveragePrice(average.toFixed(2));

        // Set chart data
        setProductChartData({
          labels: labels,
          datasets: [
            {
              label: 'Product Prices',
              data: prices,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  // Fetch order data for analysis
  useEffect(() => {
    const fetchOrderData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Authorization token is missing');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/orders/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (!data || !data.orders) {
          setError('No order data available');
          return;
        }

        // Calculate total revenue
        const total = data.orders.reduce((sum, order) => sum + order.total_amount, 0);
        setTotalRevenue(total.toFixed(2));

        // data for order totals
        const orderDates = data.orders.map(order => {
        const dateString = order.createdAt.slice(0, 19); 
        const date = new Date(dateString);
        if (isNaN(date)) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString();
        });
        const orderTotals = data.orders.map(order => order.total_amount);

        setOrderChartData({
          labels: orderDates,
          datasets: [
            {
              label: 'Total Revenue per Order',
              data: orderTotals,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError('Error fetching order data');
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  // Loading or error state if either product or order data is not available
  if (error) {
    return <div>{error}</div>;
  }

  if (!productChartData || !orderChartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      {/* Product Price Analysis */}
      <h2>Product Price Analysis</h2>
      {averagePrice && (
        <p><strong>Average Price: </strong>{averagePrice} LE</p>
      )}
      <Bar
        data={productChartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Analysis of Product Prices',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />

      {/* Order Revenue Analysis */}
      <h2>Order Revenue Analysis</h2>
      {totalRevenue && (
        <p><strong>Total Revenue: </strong>{totalRevenue} LE</p>
      )}
      <Bar
        data={orderChartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Order Revenue Analysis by Date',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (LE)',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Analysis;
