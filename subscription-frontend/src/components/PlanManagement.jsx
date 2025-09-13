import React, { useState } from 'react';
import PlanForm from './PlanForm';
import PlanTable from './PlanTable';
import './PlanManagement.css';

const PlanManagement = ({ plans, onPlanAdd, onPlanEdit, onPlanDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowAddForm(false);
  };

  const handleSave = (planData) => {
    if (editingPlan) {
      onPlanEdit({ ...planData, id: editingPlan.id });
      setEditingPlan(null);
    } else {
      onPlanAdd(planData);
    }
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingPlan(null);
  };

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      onPlanDelete(planId);
    }
  };

  return (
    <div className="plan-management">
      <div className="section-header">
        <h2>Plan Management</h2>
        <button 
          className="add-plan-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Plan
        </button>
      </div>

      <PlanTable
        plans={plans}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {(showAddForm || editingPlan) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PlanForm
              plan={editingPlan}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;


