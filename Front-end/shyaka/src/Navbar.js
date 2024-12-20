import React, { useState, useEffect } from 'react';
import fetchUserData from './UserData';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Navbar = () => {
  const [userAvailable, setUserAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Check if there is a valid token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUserAvailable(false); // No token, mark as logged out
      setLoading(false);
      return;
    }

    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setUserAvailable(true);
        if (!data) {
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

  const defaultUser = {
    first_name: 'Guest',
    last_name: 'User',
  };

  const displayName = userData ? userData.first_name : defaultUser.first_name;

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#ddc6ab' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: 'WHITE', fontWeight: 'bold' }}>SHYAKA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Shop Now
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/products">All Products</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/menproducts">Men</Link></li>
                <li><Link className="dropdown-item" to="/womenproducts">Women</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
          </ul>
          {error && <div className="text-danger">{error}</div>} {/* Display error if any */}
          {!userAvailable ? (
            <Link to="/login" className="btn btn-outline-dark ms-2">Login</Link>
          ) : (
            <div>
              <Link to="/dashboard" className="btn btn-dark ms-2">{displayName}</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
