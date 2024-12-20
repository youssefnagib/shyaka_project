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
  }, [userAvailable, loading]);


  const defaultUser = {
    first_name: 'Guest',
    last_name: 'User',
  };

  const displayName = userData ? userData.first_name : defaultUser.first_name;

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>Shyaka</Link>
      <ul style={menuStyle}>
        <li style={menuItemStyle}><Link to="/" style={menuLinkStyle}>Home</Link></li>

        <li className="nav-item dropdown" style={dropdownstyle}>
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Shop Now
          </a>
          <ul className="dropdown-menu">
            <li><Link to="/menproducts" className="dropdown-item">Men</Link></li>

            <li><hr className="dropdown-divider" /></li>
            <li><Link to="/womenproducts" className="dropdown-item">Women</Link></li>
          </ul>
        </li>
        
        <li style={menuItemStyle}><Link to="/cart" style={menuLinkStyle}>Cart</Link></li>
        <li style={menuItemStyle}><Link to='/aboutus' style={menuLinkStyle}>About us</Link></li>
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
      {!userAvailable ? (
        <Link to="/login" style={ctaStyle}>Login</Link>
      ) : (
        <div>
          <Link to="/dashboard" style={ctaStyle}>{displayName}</Link>
        </div>
      )}
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#ddc6ab',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  color: '#090909',
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const menuStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
};
const dropdownstyle = {
    margin: '0 15px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
}

const menuItemStyle = {
  margin: '0 15px',
};

const menuLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'color 0.3s',
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

export default Navbar;
