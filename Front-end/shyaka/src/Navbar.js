import React, { useState, useEffect } from 'react';
import fetchUserData from './UserData';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AdminNav from './AdminNav';

const Navbar = () => {
  const [userAvailable, setUserAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertCart, setAlertCart] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAlertCart(localStorage.getItem('alertcart'))
    console.log(alertCart)
    if (!token) {
      setUserAvailable(false);
      setLoading(false);
      return;
    }

    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setUserAvailable(true);
        localStorage.setItem('role', data.role);
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

  const role = userData?.role || 'Guest';

  const defaultUser = {
    first_name: 'Guest',
    last_name: 'User',
  };

  const displayName = userData ? userData.first_name : defaultUser.first_name;

  if (loading) {
    return;
  }

  return (
    <div className="navbar-nav">
    {role === 'Admin' ? (
      AdminNav(userData.first_name)
    ):(
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
              {alertCart ? (
                <Link to="/cart" className="nav-link position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {alertCart}
                  </span>
                  Cart
                </Link>
              ) : (
                <Link className="nav-link" to="/cart">Cart</Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
          </ul>
          {!userAvailable ? (
            <Link to="/login" className="btn btn-outline-dark ms-2">Login</Link>
          ) : (
            <div>
              <Link to="/dashboard" className="btn btn-outline-secondary position-relative">
              <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span>  {displayName} </Link>
           </div>
          )}
        </div>
      </div>
    </nav>

    )
    }
    </div>
  );
};


export default Navbar;
