// src/pages/SignUpPage.js
import React from 'react';
import './SignUpPage.css'; // Import the CSS for styling

function SignUpPage() {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Add sign-up logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form id="SignUpForm" onSubmit={handleSignUp}>
          <div className="inputbox">
            <input type="text" id="username" required placeholder=" " />
            <span>Username</span>
          </div>
          <div className="inputbox">
            <input type="email" id="email" required placeholder=" " />
            <span>E-mail</span>
          </div>
          <div className="inputbox">
            <input type="password" id="password" required placeholder=" " />
            <span>Password</span>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="input">
          <button id="google-login-btn" className="google-button">
            <i className="text1">Login with Google</i>
          </button>
        </div>
        <p><a href="/login">Already have an account?</a></p>
      </div>
    </div>
  );
}

export default SignUpPage;
