import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onPageChange, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>BroadbandHub</h2>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-nav">
            <button
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handlePageChange('home')}
            >
              Home
            </button>
            <button
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => handlePageChange('about')}
            >
              About Us
            </button>
            <button
              className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => handlePageChange('contact')}
            >
              Contact Us
            </button>
            {user && (
              <button
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => handlePageChange('dashboard')}
              >
                Dashboard
              </button>
            )}
          </div>

          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Welcome, {user.firstName}</span>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="login-button"
                  onClick={() => handlePageChange('login')}
                >
                  Login
                </button>
                <button
                  className="register-button"
                  onClick={() => handlePageChange('register')}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


