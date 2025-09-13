// Mock subscription service
const STORAGE_KEYS = {
  PLANS: 'subscription_plans',
  SUBSCRIPTIONS: 'user_subscriptions'
};

// Default plans data
const DEFAULT_PLANS = [
  { id: 1, name: 'Fibernet Basic', type: 'Fibernet', price: 499, quota: '100GB', discount: 0 },
  { id: 2, name: 'Fibernet Pro', type: 'Fibernet', price: 799, quota: '300GB', discount: 10 },
  { id: 3, name: 'Fibernet Premium', type: 'Fibernet', price: 1299, quota: 'Unlimited', discount: 5 },
  { id: 4, name: 'Copper Basic', type: 'Copper', price: 399, quota: '50GB', discount: 0 },
  { id: 5, name: 'Copper Pro', type: 'Copper', price: 599, quota: '150GB', discount: 5 },
  { id: 6, name: 'Copper Premium', type: 'Copper', price: 899, quota: '500GB', discount: 0 }
];

export const subscriptionService = {
  // Plans management
  getPlans: () => {
    const plans = localStorage.getItem(STORAGE_KEYS.PLANS);
    return plans ? JSON.parse(plans) : DEFAULT_PLANS;
  },

  savePlans: (plans) => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  },

  addPlan: (plan) => {
    const plans = subscriptionService.getPlans();
    const newPlan = {
      ...plan,
      id: Date.now() // Simple ID generation
    };
    const updatedPlans = [...plans, newPlan];
    subscriptionService.savePlans(updatedPlans);
    return newPlan;
  },

  updatePlan: (planId, updatedPlan) => {
    const plans = subscriptionService.getPlans();
    const updatedPlans = plans.map(plan => 
      plan.id === planId ? { ...updatedPlan, id: planId } : plan
    );
    subscriptionService.savePlans(updatedPlans);
    return updatedPlans.find(plan => plan.id === planId);
  },

  deletePlan: (planId) => {
    const plans = subscriptionService.getPlans();
    const updatedPlans = plans.filter(plan => plan.id !== planId);
    subscriptionService.savePlans(updatedPlans);
    return updatedPlans;
  },

  // Subscriptions management
  getSubscriptions: () => {
    const subscriptions = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    return subscriptions ? JSON.parse(subscriptions) : [];
  },

  saveSubscriptions: (subscriptions) => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
  },

  subscribe: (plan) => {
    const subscriptions = subscriptionService.getSubscriptions();
    const newSubscription = {
      ...plan,
      status: 'active',
      subscribedAt: new Date().toISOString()
    };
    const updatedSubscriptions = [...subscriptions, newSubscription];
    subscriptionService.saveSubscriptions(updatedSubscriptions);
    return newSubscription;
  },

  cancelSubscription: (planId) => {
    const subscriptions = subscriptionService.getSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === planId ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() } : sub
    );
    subscriptionService.saveSubscriptions(updatedSubscriptions);
    return updatedSubscriptions;
  },

  renewSubscription: (planId) => {
    const subscriptions = subscriptionService.getSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === planId ? { ...sub, status: 'active', renewedAt: new Date().toISOString() } : sub
    );
    subscriptionService.saveSubscriptions(updatedSubscriptions);
    return updatedSubscriptions;
  },

  upgradeSubscription: (currentPlanId, newPlan) => {
    const subscriptions = subscriptionService.getSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === currentPlanId 
        ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
        : sub
    );
    
    const newSubscription = {
      ...newPlan,
      status: 'active',
      subscribedAt: new Date().toISOString(),
      upgradedFrom: currentPlanId
    };
    
    const finalSubscriptions = [...updatedSubscriptions, newSubscription];
    subscriptionService.saveSubscriptions(finalSubscriptions);
    return finalSubscriptions;
  },

  downgradeSubscription: (currentPlanId, newPlan) => {
    const subscriptions = subscriptionService.getSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === currentPlanId 
        ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
        : sub
    );
    
    const newSubscription = {
      ...newPlan,
      status: 'active',
      subscribedAt: new Date().toISOString(),
      downgradedFrom: currentPlanId
    };
    
    const finalSubscriptions = [...updatedSubscriptions, newSubscription];
    subscriptionService.saveSubscriptions(finalSubscriptions);
    return finalSubscriptions;
  }
};


