import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import './UserProfile.css';

const UserProfile = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || ''
      });
    }
  }, [user]);

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
    
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{7,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Check if username or email is being changed and if they already exist
      if (formData.username !== user.username || formData.email !== user.email) {
        const allUsers = authService.getAllUsers();
        const otherUsers = allUsers.filter(u => u.id !== user.id);
        
        if (formData.username !== user.username && otherUsers.find(u => u.username === formData.username)) {
          setErrors({ username: 'Username already exists' });
          setIsLoading(false);
          return;
        }
        
        if (formData.email !== user.email && otherUsers.find(u => u.email === formData.email)) {
          setErrors({ email: 'Email already exists' });
          setIsLoading(false);
          return;
        }
      }

      // Update user data
      const updatedUser = authService.updateUser(user.id, formData);
      
      // Update current user in localStorage
      localStorage.setItem('subscription_current_user', JSON.stringify(updatedUser));
      
      // Notify parent component
      onUserUpdate(updatedUser);
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      username: user.username || ''
    });
    setErrors({});
    setSuccessMessage('');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </div>
        <div className="profile-info">
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="cancel-button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        <div className="profile-details">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="profile-stats">
          <h3>Account Information</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Member Since</span>
              <span className="stat-value">{formatDate(user.createdAt)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Account Type</span>
              <span className="stat-value">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">User ID</span>
              <span className="stat-value">#{user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
