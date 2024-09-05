import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useHistory from react-router-dom
import { ref, set } from "firebase/database";
import { db, auth, provider } from '../../models/firebase/firebaseConfig.js';  // Import from firebaseConfig.js
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize history hook

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
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                navigate('/IncidentAlert'); // Redirect to IncidentAlert
            })
            .catch((error) => {
                console.error("Error during Google Sign-In: ", error.message);
            });
    };

    return (
        <div className="box">
            <div className="form">
                <h2>SignIn Form</h2>
                <form onSubmit={handleSignUp}>
                    <div className="inputbox">
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <span>Username</span>
                    </div>
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
                    <input type="submit" value="SignIn" className="sub" />
                </form>
                <div className="input">
                    <button onClick={handleGoogleLogin} className="google-button">
                        <i className="text1">Login with Google</i>
                    </button>
                </div>
                <p><Link to="/LogIn">Don't have an account?</Link></p>
            </div>
        </div>
    );
};

export default SignIn;
