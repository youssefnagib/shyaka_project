import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchUserData from './UserData';
import './Dashboard.css';
import OrdersUserList from './OrdersUserList';
import OrderUserModel from './OrderUserModel';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Dashboard = () => {
  const [userAvailable, setUserAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('profile');
  const navigate = useNavigate();

  const { isWaiting, serverError, orders } = OrderUserModel('http://localhost:8000/api/orders_user/');
  console.log(orders);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUserAvailable(false);
      setLoading(false);
      navigate('/login');
      return;
    }

    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        if (data) {
          setUserData(data);
          setUserAvailable(true);
        } else {
          setUserAvailable(false);
        }
      } catch (err) {
        setError('Failed to load user data');
        setUserAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
    setUserAvailable(false);
    setUserData(null);
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-4 -">
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn ${activePage === 'profile' ? 'btn-primary' : 'btn-outline-primary'} me-3`}
          onClick={() => setActivePage('profile')}
        >
          Profile
        </button>
        <button
          className={`btn ${activePage === 'orders' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActivePage('orders')}
        >
          My Orders
        </button>
      </div>

      <div className="content container">
        {activePage === 'profile' ? (
          <div className="profile-page">
            <h2>Profile Page</h2>
            {error && <p className="text-danger">{error}</p>}
            {userData ? (
              <div className="user-data">
                <p><strong>First Name:</strong> {userData.first_name}</p>
                <p><strong>Last Name:</strong> {userData.last_name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Username:</strong> {userData.username}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        ) : (
          <div className="orders-page container">
            <h2>My Orders</h2>
            {isWaiting && <h3>Loading orders...</h3>}
            {serverError && <h3 className="text-danger">{serverError}</h3>}
            {orders && <OrdersUserList orders={orders} name={userData.first_name} />}
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <button onClick={handleLogout} className="btn btn-danger">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
