import React, { useState } from 'react';
import PlanCard from './PlanCard';
import SubscriptionCard from './SubscriptionCard';
import Recommendations from './Recommendations';
import UserProfile from './UserProfile';
import './UserDashboard.css';

const UserDashboard = ({ 
  user, 
  plans, 
  subscriptions, 
  onSubscribe, 
  onCancel, 
  onRenew, 
  onUpgrade, 
  onDowngrade, 
  onLogout,
  onUserUpdate
}) => {
  const [activeTab, setActiveTab] = useState('plans');

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const cancelledSubscriptions = subscriptions.filter(s => s.status === 'cancelled');

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.username}</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'plans' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('plans')}
        >
          Browse Plans
        </button>
        <button 
          className={activeTab === 'subscriptions' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('subscriptions')}
        >
          My Subscriptions ({activeSubscriptions.length})
        </button>
        <button 
          className={activeTab === 'recommendations' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
        <button 
          className={activeTab === 'profile' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'plans' && (
          <div className="plans-section">
            <h2>Available Plans</h2>
            <div className="plans-grid">
              {plans.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSubscribe={() => onSubscribe(plan)}
                  isSubscribed={subscriptions.some(s => s.id === plan.id && s.status === 'active')}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="subscriptions-section">
            <h2>My Subscriptions</h2>
            
            {activeSubscriptions.length > 0 && (
              <div className="subscription-group">
                <h3>Active Subscriptions</h3>
                <div className="subscriptions-grid">
                  {activeSubscriptions.map(subscription => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                      onCancel={() => onCancel(subscription.id)}
                      onUpgrade={() => onUpgrade(subscription.id)}
                      onDowngrade={() => onDowngrade(subscription.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {cancelledSubscriptions.length > 0 && (
              <div className="subscription-group">
                <h3>Cancelled Subscriptions</h3>
                <div className="subscriptions-grid">
                  {cancelledSubscriptions.map(subscription => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                      onRenew={() => onRenew(subscription.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {subscriptions.length === 0 && (
              <div className="empty-state">
                <p>No subscriptions yet. Browse our plans to get started!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <Recommendations 
            plans={plans}
            subscriptions={subscriptions}
            onSubscribe={onSubscribe}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfile 
            user={user}
            onUserUpdate={onUserUpdate}
          />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
