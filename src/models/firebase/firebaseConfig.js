import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "gs://creativetutorial-ba1bf.appspot.com",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Check if Firebase app is already initialized
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // Use the existing initialized app
}

// Initialize Firebase services
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
