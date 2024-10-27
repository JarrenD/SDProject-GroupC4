import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { PushNotifications, notify } from './pushNotifications';
import './DashboardContent.css';

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
  const [, setLatestAlerts] = useState([]);
  const navigate = useNavigate();
  const [, setGeneralNotifications] = useState([]);

  useEffect(() => {
    const alertsRef = ref(db, 'Incident_Alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedAlerts = data ? Object.values(data) : [];
      setLatestAlerts(fetchedAlerts);

      if (fetchedAlerts.length > 0) {
        const mostRecentAlert = fetchedAlerts[fetchedAlerts.length - 1];
        console.log('Fetched Incident Alert:', mostRecentAlert);
        if (mostRecentAlert && mostRecentAlert.description) {
          notify(mostRecentAlert.description);
        } else {
          console.warn('No description in most recent alert');
        }
      }
    });

    const notificationsRef = ref(db, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedNotifications = data ? Object.values(data) : [];
      setGeneralNotifications(fetchedNotifications);

      if (fetchedNotifications.length > 0) {
        const mostRecentNotification = fetchedNotifications[fetchedNotifications.length - 1];
        console.log('Fetched General Notification:', mostRecentNotification);
        if (mostRecentNotification && mostRecentNotification.message) {
          if (mostRecentNotification.type === 'all') {
            notify(`Emergency Alert: ${mostRecentNotification.message}`);
          } else {
            notify(`Notification: ${mostRecentNotification.message}`);
          }
        } else {
          console.warn('No message in most recent notification');
        }
      }
    });

    return () => {
      off(alertsRef);
      off(notificationsRef);
    };
  }, [setLatestAlerts, setGeneralNotifications]);

  return (
    <div className="dashboard-content">
      <div className="card emergency-sos">
        <h3>Emergency SOS</h3>
        <p>Press for immediate help!!!</p>
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
