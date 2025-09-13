import React from 'react';
import './Analytics.css';

const Analytics = ({ plans, subscriptions }) => {
  // Calculate analytics data
  const totalPlans = plans.length;
  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const cancelledSubscriptions = subscriptions.filter(s => s.status === 'cancelled').length;

  // Revenue calculations
  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.price, 0);

  const averageRevenuePerUser = activeSubscriptions > 0 ? totalRevenue / activeSubscriptions : 0;

  // Plan popularity
  const planPopularity = plans.map(plan => ({
    ...plan,
    subscriptions: subscriptions.filter(s => s.id === plan.id).length
  })).sort((a, b) => b.subscriptions - a.subscriptions);

  // Type distribution
  const fibernetPlans = plans.filter(p => p.type === 'Fibernet');
  const copperPlans = plans.filter(p => p.type === 'Copper');
  const fibernetSubscriptions = subscriptions.filter(s => s.status === 'active' && s.type === 'Fibernet').length;
  const copperSubscriptions = subscriptions.filter(s => s.status === 'active' && s.type === 'Copper').length;

  // Average prices
  const avgFibernetPrice = fibernetPlans.length > 0 
    ? fibernetPlans.reduce((sum, p) => sum + p.price, 0) / fibernetPlans.length 
    : 0;
  const avgCopperPrice = copperPlans.length > 0 
    ? copperPlans.reduce((sum, p) => sum + p.price, 0) / copperPlans.length 
    : 0;

  // Discount analysis
  const discountedPlans = plans.filter(p => p.discount > 0);
  const avgDiscount = discountedPlans.length > 0 
    ? discountedPlans.reduce((sum, p) => sum + p.discount, 0) / discountedPlans.length 
    : 0;

  return (
    <div className="analytics">
      <h2>Analytics & Insights</h2>
      
      <div className="analytics-grid">
        {/* Key Metrics */}
        <div className="metric-card">
          <h3>Key Metrics</h3>
          <div className="metric-item">
            <span className="metric-label">Total Plans:</span>
            <span className="metric-value">{totalPlans}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Active Subscriptions:</span>
            <span className="metric-value">{activeSubscriptions}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cancelled Subscriptions:</span>
            <span className="metric-value">{cancelledSubscriptions}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Total Revenue:</span>
            <span className="metric-value">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Revenue/User:</span>
            <span className="metric-value">₹{Math.round(averageRevenuePerUser)}</span>
          </div>
        </div>

        {/* Plan Popularity */}
        <div className="metric-card">
          <h3>Plan Popularity</h3>
          <div className="popularity-list">
            {planPopularity.slice(0, 5).map(plan => (
              <div key={plan.id} className="popularity-item">
                <span className="plan-name">{plan.name}</span>
                <span className="subscription-count">{plan.subscriptions} subs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Distribution */}
        <div className="metric-card">
          <h3>Connection Type Distribution</h3>
          <div className="type-distribution">
            <div className="type-item">
              <div className="type-header">
                <span className="type-name">Fibernet</span>
                <span className="type-count">{fibernetSubscriptions} active</span>
              </div>
              <div className="type-stats">
                <span>Avg Price: ₹{Math.round(avgFibernetPrice)}</span>
                <span>Plans: {fibernetPlans.length}</span>
              </div>
            </div>
            <div className="type-item">
              <div className="type-header">
                <span className="type-name">Copper</span>
                <span className="type-count">{copperSubscriptions} active</span>
              </div>
              <div className="type-stats">
                <span>Avg Price: ₹{Math.round(avgCopperPrice)}</span>
                <span>Plans: {copperPlans.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Insights */}
        <div className="metric-card">
          <h3>Pricing Insights</h3>
          <div className="pricing-insights">
            <div className="insight-item">
              <span className="insight-label">Discounted Plans:</span>
              <span className="insight-value">{discountedPlans.length} out of {totalPlans}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Average Discount:</span>
              <span className="insight-value">{Math.round(avgDiscount)}%</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Price Range:</span>
              <span className="insight-value">
                ₹{Math.min(...plans.map(p => p.price))} - ₹{Math.max(...plans.map(p => p.price))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations for Admins */}
      <div className="admin-recommendations">
        <h3>Recommendations</h3>
        <div className="recommendation-list">
          {discountedPlans.length === 0 && (
            <div className="recommendation-item">
              <span className="recommendation-icon">💡</span>
              <span>Consider adding discounted plans to increase subscriptions</span>
            </div>
          )}
          {fibernetSubscriptions > copperSubscriptions * 2 && (
            <div className="recommendation-item">
              <span className="recommendation-icon">📈</span>
              <span>Fibernet plans are very popular - consider adding more options</span>
            </div>
          )}
          {avgDiscount < 10 && (
            <div className="recommendation-item">
              <span className="recommendation-icon">💰</span>
              <span>Consider increasing discounts to boost sales</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;


