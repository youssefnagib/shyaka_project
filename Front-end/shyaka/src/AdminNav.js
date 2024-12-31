import { Link } from "react-router-dom";

const AdminNav = ( name ) => {
  console.log( name );
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#ddc6ab' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: 'WHITE', fontWeight: 'bold' }}>
          SHYAKA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation" // Added aria-label
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-label="Home">Home</Link>
            </li>
            
            <li className="nav-item">
            <Link className="nav-link" to="/adminproducts" aria-label="Admin products">Admin Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/analysis" aria-label="Analysis">Analysis</Link> {/* Added aria-label */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminorders" aria-label="AdminOrders">Orders</Link> {/* Added aria-label */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus" aria-label="About Us">About Us</Link> {/* Added aria-label */}
            </li>
          </ul>

          {/* Conditional Rendering for Admin Dashboard Link */}
            <div>
              <Link to="/dashboard" className="btn btn-outline-secondary position-relative">
                {name && (
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden"></span>
                </span>
                )}
                
                {name}
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
