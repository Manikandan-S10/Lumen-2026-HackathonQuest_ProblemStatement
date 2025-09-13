import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      await onLogin(username, password);
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Broadband Subscription Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="demo-credentials">
          <p>Demo credentials:</p>
          <p><strong>Admin:</strong> admin / admin</p>
          <p><strong>User:</strong> user / user</p>
        </div>
        
        <div className="auth-switch">
          <p>Don't have an account? 
            <button 
              type="button" 
              className="switch-button"
              onClick={onSwitchToRegister}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
