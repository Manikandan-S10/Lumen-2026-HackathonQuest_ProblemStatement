import React from 'react';
import './SubscriptionCard.css';

const SubscriptionCard = ({ 
  subscription, 
  onCancel, 
  onRenew, 
  onUpgrade, 
  onDowngrade 
}) => {
  const isActive = subscription.status === 'active';
  const isCancelled = subscription.status === 'cancelled';

  return (
    <div className={`subscription-card ${subscription.type.toLowerCase()} ${subscription.status}`}>
      <div className="subscription-header">
        <h3 className="subscription-name">{subscription.name}</h3>
        <div className={`status-badge ${subscription.status}`}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </div>
      </div>

      <div className="subscription-details">
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{subscription.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value">₹{subscription.price}/month</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Quota:</span>
          <span className="detail-value">{subscription.quota}</span>
        </div>
        {subscription.discount > 0 && (
          <div className="detail-row">
            <span className="detail-label">Discount:</span>
            <span className="detail-value discount">{subscription.discount}% OFF</span>
          </div>
        )}
      </div>

      <div className="subscription-actions">
        {isActive && (
          <>
            <button 
              className="action-button cancel"
              onClick={() => onCancel(subscription.id)}
            >
              Cancel
            </button>
            <button 
              className="action-button upgrade"
              onClick={() => onUpgrade(subscription.id)}
            >
              Upgrade
            </button>
            <button 
              className="action-button downgrade"
              onClick={() => onDowngrade(subscription.id)}
            >
              Downgrade
            </button>
          </>
        )}
        
        {isCancelled && (
          <button 
            className="action-button renew"
            onClick={() => onRenew(subscription.id)}
          >
            Renew
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;

