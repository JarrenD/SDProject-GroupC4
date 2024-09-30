import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { PushNotifications, notify } from './pushNotifications';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
  authDomain: "creativetutorial-ba1bf.firebaseapp.com",
  databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-ba1bf",
  storageBucket: "creativetutorial-ba1bf",
  messagingSenderId: "945665449612",
  appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DashboardContent = () => {
  const [, setLatestAlerts] = useState([]); // Changed to handle multiple alerts
 
  
 
  const navigate = useNavigate();
  
  useEffect(() => {
    const alertsRef = ref(db, 'Incident_Alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedAlerts = data ? Object.values(data) : [];
      setLatestAlerts(fetchedAlerts); // Update state to an array of alerts

      if (fetchedAlerts.length > 0) {
        const mostRecentAlert = fetchedAlerts[fetchedAlerts.length - 1];
        notify(mostRecentAlert.description); // Trigger the notification
      }
    });

    return () => {
      off(alertsRef);
    };
  }, [setLatestAlerts]);

  return (
    <div className="dashboard-content">
      <div className="card emergency-sos">
        <h3>Emergency SOS </h3>
        <p>Press for immediate help !!! </p>
        <button onClick={() => navigate('/location-sharing')}>Alert Campus Security</button>
      </div>

      <div className="card incident-reporting">
        <h3>Report Incident</h3>
        <p>Click to provide details of any suspicious or dangerous activities on campus.</p>
        <button onClick={() => navigate('/incident-reporting')}>Report Now</button>
      </div>

      
      

      <PushNotifications />
    </div>
  );
};

export default DashboardContent;