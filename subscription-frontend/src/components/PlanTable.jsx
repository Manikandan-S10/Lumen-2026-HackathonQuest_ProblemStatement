import React from 'react';
import './PlanTable.css';

const PlanTable = ({ plans, onEdit, onDelete }) => {
  return (
    <div className="plan-table-container">
      <table className="plan-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quota</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id} className={`plan-row ${plan.type.toLowerCase()}`}>
              <td className="plan-name">{plan.name}</td>
              <td>
                <span className={`type-badge ${plan.type.toLowerCase()}`}>
                  {plan.type}
                </span>
              </td>
              <td className="plan-price">₹{plan.price}</td>
              <td className="plan-quota">{plan.quota}</td>
              <td className="plan-discount">
                {plan.discount > 0 ? `${plan.discount}%` : '-'}
              </td>
              <td className="plan-actions">
                <button 
                  className="edit-button"
                  onClick={() => onEdit(plan)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button"
                  onClick={() => onDelete(plan.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {plans.length === 0 && (
        <div className="empty-state">
          <p>No plans available. Add your first plan to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PlanTable;


