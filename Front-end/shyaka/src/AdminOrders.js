import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LOADING from './loading.gif';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access_token');

  // Fetch orders on component mount
  useEffect(() => {
    if (localStorage.getItem('role') !== 'Admin') {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, token]);

  // Handle order deletion
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order. Status: ${response.status}`);
      }

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  // Handle order update
  const updateOrder = async (orderId, newStatus, newPaymentMethod, newPaymentStatus) => {
    const previousOrders = [...orders];
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, payment_method: newPaymentMethod, payment_status: newPaymentStatus }
          : order
      )
    );

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/update/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          payment_method: newPaymentMethod,
          payment_status: newPaymentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order. Status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updatedOrder.status,
                payment_method: updatedOrder.payment_method,
                payment_status: updatedOrder.payment_status,
              }
            : order
        )
      );
      alert('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      setOrders(previousOrders);
      alert('Failed to update order.');
    }
  };

  if (loading) {
    return (
      <div style={loadingContainerStyles}>
        <img src={LOADING} alt="Loading..." style={loadingImageStyles} />
      </div>
    );
  }

  return (
    <div className='container'>
      <h2>Admin Orders Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrder(order.id, e.target.value, order.payment_method, order.payment_status)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <select
                  value={order.payment_status}
                  onChange={(e) =>
                    updateOrder(order.id, order.status, order.payment_method, e.target.value)
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </td>
              <td>
                <select
                  value={order.payment_method}
                  onChange={(e) =>
                    updateOrder(order.id, order.status, e.target.value, order.payment_status)
                  }
                >
                  <option value="COD">COD</option>
                  <option value="Card">Card</option>
                </select>
              </td>
              <td>${order.total_amount}</td>
              <td>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const loadingContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const loadingImageStyles = {
  width: '25%',
  borderRadius: '8px',
};

export default AdminOrders;
