import React from 'react';
import './HomePage.css';

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Fast, Reliable Broadband Internet</h1>
            <p className="hero-subtitle">
              Experience lightning-fast internet with our premium broadband services. 
              Choose from our range of Fibernet and Copper plans designed for every need.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={() => onGetStarted()}>
                Get Started
              </button>
              <button className="cta-button secondary" onClick={() => onGetStarted()}>
                View Plans
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="wifi-icon">📶</div>
              <div className="speed-indicator">
                <div className="speed-bar"></div>
                <div className="speed-bar"></div>
                <div className="speed-bar"></div>
                <div className="speed-bar"></div>
                <div className="speed-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose BroadbandHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Experience blazing fast internet speeds with our advanced fiber technology</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Reliable Connection</h3>
              <p>99.9% uptime guarantee with our robust network infrastructure</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Plans</h3>
              <p>Competitive pricing with flexible plans to suit every budget</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support to help you whenever you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="plans-preview-section">
        <div className="container">
          <h2>Our Internet Plans</h2>
          <p className="section-subtitle">Choose the perfect plan for your needs</p>
          <div className="plans-preview-grid">
            <div className="plan-preview-card fibernet">
              <div className="plan-type">Fibernet</div>
              <h3>Fibernet Pro</h3>
              <div className="plan-price">₹799<span>/month</span></div>
              <ul className="plan-features">
                <li>300GB Data</li>
                <li>Ultra-fast speeds</li>
                <li>10% discount</li>
                <li>24/7 support</li>
              </ul>
              <button className="plan-button" onClick={() => onGetStarted()}>
                Learn More
              </button>
            </div>
            <div className="plan-preview-card copper">
              <div className="plan-type">Copper</div>
              <h3>Copper Pro</h3>
              <div className="plan-price">₹599<span>/month</span></div>
              <ul className="plan-features">
                <li>150GB Data</li>
                <li>Reliable connection</li>
                <li>5% discount</li>
                <li>24/7 support</li>
              </ul>
              <button className="plan-button" onClick={() => onGetStarted()}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers and experience the best internet service</p>
            <button className="cta-button primary large" onClick={() => onGetStarted()}>
              Sign Up Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


