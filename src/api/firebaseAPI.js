import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
  authDomain: "creativetutorial-ba1bf.firebaseapp.com",
  databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-ba1bf",
  storageBucket: "creativetutorial-ba1bf.appspot.com",
  messagingSenderId: "945665449612",
  appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Function to fetch alerts from Firebase
export const fetchAlertsFromFirebase = () => {
  return new Promise((resolve, reject) => {
    const alertsRef = firebase.database().ref('Incident_Alerts'); 

    alertsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const fetchedAlerts = [];
      for (let id in data) {
        fetchedAlerts.push(data[id]);
      }
      resolve(fetchedAlerts);
    }, (error) => {
      reject(error);
    });
  });
};

// Clean up listener
export const removeFirebaseListener = () => {
  const alertsRef = firebase.database().ref('Incident_Alerts');
  alertsRef.off();
};
