// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Import the CSS for styling
import { ref, set } from "firebase/database";
import { db, auth, provider } from '../../models/firebase/firebaseConfig.js';  // Import from firebaseConfig.js
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpPage({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');

  const navigate = useNavigate();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store additional user information in the database
                set(ref(db, 'user/' + user.uid), {
                    username: username,
                    email: email
                })
                .then(() => {
                    alert("SignUp Successful!");
                    navigate('/LogIn');  // Redirect to login page using history.push
                })
                .catch((error) => {
                    alert("Error storing user data: " + error.message);
                });
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert("email is already registered. Please LogIn or try again.");
              } else {
                alert("Error: " + error.message);
              }
            });
    };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
          handleLogin();  // Call handleLogin to update state
          navigate('/dashboard');  // Redirect to the dashboard
        })
        .catch((error) => {
          if (error.code === 'auth/popup-closed-by-user') {
            console.log("Google Sign-In popup was closed by the user.");
            // Optionally, you can show a subtle message to the user, or do nothing.
          } else {
            console.error("Error during Google Sign-In: ", error.message);
            setError("Error during Google Sign-In: " + error.message); // Optionally set an error message in the UI
          }
        });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create New Account</h2>
        <form id="SignUpForm" onSubmit={handleSignUp}>
          <div className="inputbox">
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder=" " />
            <span>Username</span>
          </div>
          <div className="inputbox">
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
            <span>Email</span>
          </div>
          <div className="inputbox">
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
            <span>Password</span>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {/* Gray Separator */}
        <div className="separator">
          <hr className="line" />
          <span className="separator-text"> or continue with </span>
          <hr className="line" />
        </div>
        <div className="input">
          <button id="google-login-btn" onClick={handleGoogleLogin} className="google-button">
            <img src="/images/google-logo.png" alt="Google Logo" className="google-logo" />
            <i className="text1">Sign up with Google</i>
          </button>
        </div>
        {/* Login section */}
        <p className="signup-text">
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
