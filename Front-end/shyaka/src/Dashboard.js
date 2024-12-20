import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchUserData from './UserData';
import './Dashboard.css';

const Dashboard = () => {
  const [userAvailable, setUserAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('profile'); // Track active page
  const navigate = useNavigate();

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
    setUserAvailable(false);
    setUserData(null);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <button
          className={`nav-btn ${activePage === 'profile' ? 'active' : ''}`}
          onClick={() => setActivePage('profile')}
        >
          Profile
        </button>
        <button
          className={`nav-btn ${activePage === 'orders' ? 'active' : ''}`}
          onClick={() => setActivePage('orders')}
        >
          My Orders
        </button>
      </div>

      <div className="content">
        {activePage === 'profile' ? (
          <div className="profile-page">
            <h1>Profile Page</h1>
            {error && <p className="error">{error}</p>}
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
          <div className="orders-page">
            <h1>My Orders</h1>
            <p>You currently have no orders.</p>
          </div>
        )}
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
