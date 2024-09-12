import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database"; // Import Firebase Database
import React, { useState, useEffect } from 'react';
import './notifications.css';

//Firebase configuration
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
const db = getDatabase(app); // Initialize Firebase Realtime Database

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  let alertsRef; // Declare a variable to store the Firebase reference

  useEffect(() => {
    // Load static announcements data
    setAnnouncements([
      {
        title: "Lock Your Car Doors:",
        description:
          "As a reminder, please ensure you lock your car doors and keep valuables out of sight. This simple precaution can help prevent theft.",
      },
      {
        title: "Speed Limit:",
        description:
          "Remember to stay within the campus speed limit of 60 km/h. Adhering to this speed limit ensures safety for both drivers and pedestrians.",
      },
      {
        title: "Phone Theft:",
        description:
          "With the upcoming Wits Concert, we are aware of the increased risk of phone theft at campus events of this nature. Therefore, the university will be following protocols to ensure your safety. Remember to stay vigilant!",
      },
    ]);

    // Fetch alerts using Firebase Database
    const fetchAlerts = async () => {
      try {
        alertsRef = ref(db, 'Incident_Alerts'); // Use the reference variable
        onValue(alertsRef, (snapshot) => {
          const data = snapshot.val();
          const fetchedAlerts = data ? Object.values(data) : [];
          setAlerts(fetchedAlerts);
        });
      } catch (error) {
        console.error("Error fetching alerts: ", error);
      }
    };

    fetchAlerts();

    // Clean up Firebase listener on component unmount
    return () => {
      if (alertsRef) {
        off(alertsRef); // Remove listener
      }
    };
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CAMPUS SAFETY</h1>
        <h2>NOTIFICATION CENTER</h2>
      </header>
      <div className="main-container">
        <div className="welcome-section">
          <h2>WELCOME BACK, USER!</h2>
          <div className="notification-buttons">
            <button
              className={`tab ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => handleTabClick('inbox')}
            >
              Inbox
            </button>
            <button
              className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => handleTabClick('announcements')}
            >
              Announcements
            </button>
          </div>

          <div id="inbox-content" className="announcements" style={{ display: activeTab === 'inbox' ? 'block' : 'none' }}>
            {alerts.length === 0 ? (
              <p>No alerts to display</p>
            ) : (
              alerts.map((alert, index) => (
                <div key={index} className="notification-alert">
                  <strong>{alert.title}</strong>
                  <p>{alert.description}</p>
                </div>
              ))
            )}
          </div>

          <div id="announcements-content" className="announcements" style={{ display: activeTab === 'announcements' ? 'block' : 'none' }}>
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement">
                <div className="announcement-text">
                  <strong>{announcement.title}</strong>
                  <p>{announcement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notifications-panel">
          <h3>Alerts</h3>
          <div className="real-time-notification">
            {alerts.length === 0 ? (
              <p>No new alerts</p>
            ) : (
              alerts.map((alert, index) => (
                <div key={index} className="notification-alert">
                  <strong>{alert.title}</strong>
                  <p>{alert.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
