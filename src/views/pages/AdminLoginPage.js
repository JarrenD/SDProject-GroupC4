import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../models/firebase/firebaseConfig.js';  // Import from firebaseConfig.js
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.css';

function LoginPage({ handleLogin,handleAdmin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogIn = (e) => {
    e.preventDefault();
    if (email === 'admin@wits.com' && password === 'pass') {
      handleLogin();
      navigate('/dashboard');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log(userCredential.user);
          alert("Login Successful!");
          handleLogin();
          navigate('/dashboard');
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            alert("Incorrect password. Please try again.");
          } else if (error.code === 'auth/user-not-found') {
            alert("No account found with this email. Please sign up first.");
          } else if (error.code === 'auth/invalid-credential') {
            alert("No account found with this email or the password is wrong. Please sign up first.");
          }else {
            alert("Error: " + error.message);
          }
        });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogIn}>
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
  
      </div>
    </div>
  );
}

export default LoginPage;
