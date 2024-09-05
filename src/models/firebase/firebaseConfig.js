import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "creativetutorial-ba1bf",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);  // Initialize storage

export { db, auth, provider, storage };  // Export storage
