import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "creativetutorial-ba1bf",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Google Sign-In
const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = "../back.html";
        })
        .catch((error) => {
            console.error("Error during Google Sign-In: ", error.message);
        });
});
const SignUpForm = document.getElementById("SignUpForm");
SignUpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

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
                alert("You will now be forwarded to the LogIn page to LogIn");
                window.location.href = "../LogIn.html"; // Redirect after successful sign-up
            })
            .catch((error) => {
                alert("Error storing user data: " + error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            if (errorCode === 'auth/email-already-in-use') {
                alert("This email is already in use. Please use a different email.");
            } else if (errorCode === 'auth/invalid-email') {
                alert("The email address is not valid.");
            } else if (errorCode === 'auth/weak-password') {
                alert("The password is too weak. It must be at least 6 characters.");
            } else {
                alert("Error: " + errorMessage);
            }
        });
});
