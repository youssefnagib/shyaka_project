import fetchUserData from './UserData';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userAvailable, setUserAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    setUserAvailable(false);
    setUserData(null);
    window.location.reload();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Shyaka dashboard</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <>
          <p>Your first name is: {userData.first_name}</p>
          <p>Your last name is: {userData.last_name}</p>
          <p>Your email is: {userData.email}</p>
          <p>Your username is: {userData.username}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogout} style={ctaStyle}>
        Log Out
      </button>
    </div>
  );
};

const ctaStyle = {
  backgroundColor: '#938d89',
  color: '#222',
  padding: '10px 20px',
  textDecoration: 'none',
  fontWeight: 'bold',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
};

export default Dashboard;
