// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "creativetutorial-ba1bf.appspot.com",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();

  const googleLogin = document.getElementById("google-login-btn");

  googleLogin.addEventListener("click",function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    window.location.href ="Incident_alert.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
  });
  })

// Get a reference to the database service
const db = getDatabase(app);

// Handle the form submission
const LogInForm = document.getElementById("LogInForm");
LogInForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Login Successful!");
          window.location.href = "../public/Incident_alert.html"; // Redirect to a dashboard or main page
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
              alert("Incorrect password. Please try again.");
          } else if (errorCode === 'auth/user-not-found') {
              alert("No account found with this email. Please sign up first.");
          } else {
              alert("Error: " + errorMessage);
          }
      });
});