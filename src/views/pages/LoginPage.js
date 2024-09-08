import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === 'email@email.com' && password === 'pass') {
      handleLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLoginSubmit}>
          <div className="inputbox">
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder=" " 
            />
            <span>Email</span>
          </div>
          <div className="inputbox">
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder=" " 
            />
            <span>Password</span>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="input">
          <button id="google-login-btn" className="google-button">
            <i className="text1">Login with Google</i>
          </button>
        </div>
        <p><a href="/signup">Don't have an account?</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
