import React, { useState, useEffect } from 'react';
import './PlanForm.css';

const PlanForm = ({ plan, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Fibernet',
    price: '',
    quota: '',
    discount: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        type: plan.type || 'Fibernet',
        price: plan.price || '',
        quota: plan.quota || '',
        discount: plan.discount || 0
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discount' ? Number(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.quota.trim()) {
      newErrors.quota = 'Quota is required';
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="plan-form">
      <h3>{plan ? 'Edit Plan' : 'Add New Plan'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Plan Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="e.g., Fibernet Pro"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Connection Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Fibernet">Fibernet</option>
            <option value="Copper">Copper</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="799"
              min="0"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className={errors.discount ? 'error' : ''}
              placeholder="10"
              min="0"
              max="100"
            />
            {errors.discount && <span className="error-message">{errors.discount}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="quota">Data Quota *</label>
          <input
            type="text"
            id="quota"
            name="quota"
            value={formData.quota}
            onChange={handleChange}
            className={errors.quota ? 'error' : ''}
            placeholder="e.g., 300GB, Unlimited"
          />
          {errors.quota && <span className="error-message">{errors.quota}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            {plan ? 'Update Plan' : 'Add Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;


