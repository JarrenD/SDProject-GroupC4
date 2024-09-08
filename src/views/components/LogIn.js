import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../models/firebase/firebaseConfig.js';  // Import from firebaseConfig.js
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import './LogIn.css';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize history hook

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user);
                navigate('/IncidentAlert');
            })
            .catch(error => {
                console.error("Error during Google Sign-In: ", error.message);
            });
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                alert("Login Successful!");
                navigate('/IncidentAlert');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert("Incorrect password. Please try again.");
                } else if (error.code === 'auth/user-not-found') {
                    alert("No account found with this email. Please sign up first.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    };

    return (
        <div className="box">
            <div className="form">
                <h2>Login Form</h2>
                <form onSubmit={handleEmailLogin}>
                    <div className="inputbox">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <span>E-mail</span>
                    </div>
                    <div className="inputbox">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <span>Password</span>
                    </div>
                    <input type="submit" value="submit" className="sub" />
                </form>
                <div className="input">
                    <button onClick={handleGoogleLogin} className="google-button">
                        <i className="text1">Login with Google</i>
                    </button>
                </div>
                <p><Link to="/SignIn">Don't have an account?</Link></p>
            </div>
        </div>
    );
}

export default Login;
