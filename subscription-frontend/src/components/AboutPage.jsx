import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About BroadbandHub</h1>
          <p className="hero-subtitle">
            Connecting communities with reliable, high-speed internet since 2020
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At BroadbandHub, we believe that fast, reliable internet is not a luxury—it's a necessity. 
                Our mission is to bridge the digital divide by providing affordable, high-quality broadband 
                services to homes and businesses across the country.
              </p>
              <p>
                We're committed to delivering exceptional customer service, cutting-edge technology, 
                and transparent pricing to ensure that everyone has access to the digital world.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-graphic">
                <div className="network-nodes">
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                </div>
                <div className="connection-lines"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Reliability</h3>
              <p>We maintain 99.9% uptime through robust infrastructure and proactive monitoring</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our priority. We listen, learn, and adapt to serve you better</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We continuously invest in the latest technology to deliver superior performance</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Transparency</h3>
              <p>No hidden fees, no surprises. Clear pricing and honest communication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <p className="section-subtitle">
            Meet the dedicated professionals behind BroadbandHub
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">
                With 15+ years in telecommunications, Sarah leads our vision of connecting communities.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🔧</div>
              <h3>Mike Chen</h3>
              <p className="member-role">Chief Technology Officer</p>
              <p className="member-bio">
                Mike ensures our network infrastructure delivers the fastest, most reliable service.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Emily Rodriguez</h3>
              <p className="member-role">Head of Customer Success</p>
              <p className="member-bio">
                Emily and her team are dedicated to providing exceptional customer support 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Active Subscribers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Network Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Company Founded</h3>
                <p>BroadbandHub was established with a vision to revolutionize internet connectivity</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>First 1000 Customers</h3>
                <p>Reached our first milestone of 1000 satisfied customers in our launch city</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Fiber Network Expansion</h3>
                <p>Launched our high-speed fiber network across 25 major cities</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>50,000+ Subscribers</h3>
                <p>Celebrated reaching 50,000 active subscribers nationwide</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Future Innovation</h3>
                <p>Continuing to expand and innovate with next-generation technologies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>Experience the difference that reliable, fast internet can make in your life</p>
            <div className="cta-buttons">
              <button className="cta-button primary">Get Started</button>
              <button className="cta-button secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


