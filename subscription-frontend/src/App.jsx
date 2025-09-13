import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { authService } from './services/authService';
import { subscriptionService } from './services/subscriptionService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', 'contact', 'login', 'register', 'dashboard'

  // Initialize app data
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setCurrentPage('dashboard');
        }

        // Load plans and subscriptions
        const plansData = subscriptionService.getPlans();
        const subscriptionsData = subscriptionService.getSubscriptions();
        
        setPlans(plansData);
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Authentication handlers
  const handleLogin = async (username, password) => {
    try {
      setLoading(true);
      const user = await authService.login(username, password);
      setUser(user);
      setCurrentPage('dashboard');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      console.log('Registering user:', userData);
      const user = await authService.register(userData);
      console.log('Registration successful:', user);
      setUser(user);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Registration error in App:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setSubscriptions([]);
    setCurrentPage('home');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Subscription handlers
  const handleSubscribe = (plan) => {
    try {
      const newSubscription = subscriptionService.subscribe(plan);
      setSubscriptions(prev => [...prev, newSubscription]);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      alert('Failed to subscribe to plan. Please try again.');
    }
  };

  const handleCancelSubscription = (planId) => {
    try {
      subscriptionService.cancelSubscription(planId);
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === planId 
            ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
            : sub
        )
      );
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  const handleRenewSubscription = (planId) => {
    try {
      subscriptionService.renewSubscription(planId);
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === planId 
            ? { ...sub, status: 'active', renewedAt: new Date().toISOString() }
            : sub
        )
      );
    } catch (error) {
      console.error('Error renewing subscription:', error);
      alert('Failed to renew subscription. Please try again.');
    }
  };

  const handleUpgrade = (planId) => {
    try {
      const currentSub = subscriptions.find(s => s.id === planId);
      const higherPlans = plans.filter(p => 
        p.type === currentSub.type && p.price > currentSub.price
      );
      
      if (higherPlans.length > 0) {
        const newPlan = higherPlans[0];
        subscriptionService.upgradeSubscription(planId, newPlan);
        
        // Update local state
        setSubscriptions(prev => {
          const updated = prev.map(sub => 
            sub.id === planId 
              ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
              : sub
          );
          return [...updated, { ...newPlan, status: 'active', subscribedAt: new Date().toISOString() }];
        });
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      alert('Failed to upgrade subscription. Please try again.');
    }
  };

  const handleDowngrade = (planId) => {
    try {
      const currentSub = subscriptions.find(s => s.id === planId);
      const lowerPlans = plans.filter(p => 
        p.type === currentSub.type && p.price < currentSub.price
      );
      
      if (lowerPlans.length > 0) {
        const newPlan = lowerPlans[lowerPlans.length - 1];
        subscriptionService.downgradeSubscription(planId, newPlan);
        
        // Update local state
        setSubscriptions(prev => {
          const updated = prev.map(sub => 
            sub.id === planId 
              ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
              : sub
          );
          return [...updated, { ...newPlan, status: 'active', subscribedAt: new Date().toISOString() }];
        });
      }
    } catch (error) {
      console.error('Error downgrading subscription:', error);
      alert('Failed to downgrade subscription. Please try again.');
    }
  };

  // Admin plan management handlers
  const handlePlanAdd = (planData) => {
    try {
      const newPlan = subscriptionService.addPlan(planData);
      setPlans(prev => [...prev, newPlan]);
    } catch (error) {
      console.error('Error adding plan:', error);
      alert('Failed to add plan. Please try again.');
    }
  };

  const handlePlanEdit = (planId, updatedPlan) => {
    try {
      subscriptionService.updatePlan(planId, updatedPlan);
      setPlans(prev => 
        prev.map(plan => 
          plan.id === planId ? { ...updatedPlan, id: planId } : plan
        )
      );
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan. Please try again.');
    }
  };

  const handlePlanDelete = (planId) => {
    try {
      subscriptionService.deletePlan(planId);
      setPlans(prev => prev.filter(plan => plan.id !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan. Please try again.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 'login') {
      setAuthMode('login');
    } else if (page === 'register') {
      setAuthMode('register');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('register');
      setAuthMode('register');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        {currentPage === 'home' && (
          <HomePage onGetStarted={handleGetStarted} />
        )}
        
        {currentPage === 'about' && (
          <AboutPage />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        
        {currentPage === 'login' && !user && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setAuthMode('register')}
          />
        )}
        
        {currentPage === 'register' && !user && (
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
        
        {currentPage === 'dashboard' && user && user.role === 'user' && (
          <UserDashboard
            user={user}
            plans={plans}
            subscriptions={subscriptions}
            onSubscribe={handleSubscribe}
            onCancel={handleCancelSubscription}
            onRenew={handleRenewSubscription}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
            onLogout={handleLogout}
            onUserUpdate={handleUserUpdate}
          />
        )}
        
        {currentPage === 'dashboard' && user && user.role === 'admin' && (
          <AdminDashboard
            user={user}
            plans={plans}
            subscriptions={subscriptions}
            onPlanAdd={handlePlanAdd}
            onPlanEdit={handlePlanEdit}
            onPlanDelete={handlePlanDelete}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
}

export default App
