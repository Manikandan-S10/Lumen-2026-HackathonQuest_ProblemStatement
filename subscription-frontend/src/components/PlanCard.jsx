import React from 'react';
import './PlanCard.css';

const PlanCard = ({ plan, onSubscribe, isSubscribed }) => {
  const discountedPrice = plan.price * (1 - plan.discount / 100);

  return (
    <div className={`plan-card ${plan.type.toLowerCase()}`}>
      <div className="plan-header">
        <h3 className="plan-name">{plan.name}</h3>
        <div className="plan-type">{plan.type}</div>
      </div>
      
      <div className="plan-pricing">
        <div className="price-container">
          {plan.discount > 0 && (
            <span className="original-price">₹{plan.price}</span>
          )}
          <span className="current-price">₹{Math.round(discountedPrice)}</span>
          <span className="price-period">/month</span>
        </div>
        {plan.discount > 0 && (
          <div className="discount-badge">
            {plan.discount}% OFF
          </div>
        )}
      </div>

      <div className="plan-features">
        <div className="feature">
          <span className="feature-label">Data Quota:</span>
          <span className="feature-value">{plan.quota}</span>
        </div>
        <div className="feature">
          <span className="feature-label">Connection Type:</span>
          <span className="feature-value">{plan.type}</span>
        </div>
      </div>

      <button 
        className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
        onClick={onSubscribe}
        disabled={isSubscribed}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe Now'}
      </button>
    </div>
  );
};

export default PlanCard;

