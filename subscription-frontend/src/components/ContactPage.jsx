import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit message when user starts typing
    if (submitMessage) {
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{7,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="hero-subtitle">
            We're here to help! Get in touch with our team for any questions or support.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? 'error' : ''}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="new-service">New Service Request</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us how we can help you..."
                    rows="5"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri: 8AM-8PM</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-content">
                    <h3>Email</h3>
                    <p>support@broadbandhub.com</p>
                    <p>We respond within 24 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-content">
                    <h3>Address</h3>
                    <p>123 Tech Street<br />Digital City, DC 12345</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div className="method-content">
                    <h3>Live Chat</h3>
                    <p>Available 24/7</p>
                    <p>Click the chat icon to start</p>
                  </div>
                </div>
              </div>

              <div className="office-hours">
                <h3>Office Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="emergency-contact">
                <h3>Emergency Support</h3>
                <p>For urgent technical issues outside office hours:</p>
                <p className="emergency-number">+1 (555) 911-TECH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I check my internet speed?</h3>
              <p>You can run a speed test by visiting our speed test page or using any online speed test tool. For accurate results, ensure no other devices are using the internet.</p>
            </div>
            <div className="faq-item">
              <h3>What should I do if my internet is down?</h3>
              <p>First, try restarting your modem and router. If the issue persists, check our service status page or contact our 24/7 technical support.</p>
            </div>
            <div className="faq-item">
              <h3>How can I upgrade my plan?</h3>
              <p>You can upgrade your plan anytime through your online dashboard or by calling our customer service. Changes typically take effect within 24 hours.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer installation support?</h3>
              <p>Yes! We provide professional installation services for all our plans. Our technicians will ensure everything is set up correctly and working optimally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;


