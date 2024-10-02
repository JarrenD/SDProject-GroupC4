import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import React, { useState, useEffect } from 'react';
import './notifications.css'; // Make sure your CSS file is correctly referenced

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

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch announcements
        const announcementsSnapshot = await get(ref(db, 'announcements'));
        if (announcementsSnapshot.exists()) {
          setAnnouncements(Object.values(announcementsSnapshot.val()));
        } else {
          setAnnouncements([]);
        }

        // Fetch alerts
        const alertsSnapshot = await get(ref(db, 'Incident_Alerts'));
        if (alertsSnapshot.exists()) {
          setAlerts(Object.values(alertsSnapshot.val()));
        } else {
          setAlerts([]);
        }

        // Fetch notifications
        const notificationsSnapshot = await get(ref(db, 'notifications'));
        if (notificationsSnapshot.exists()) {
          const notificationsData = notificationsSnapshot.val();
          setNotifications(notificationsData);
          console.log("notifications snapshot value:", notificationsData);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notifications</h1>
        <h2>NOTIFICATION CENTER</h2>
      </header>
      <div className="main-container">
        <div className="welcome-section">
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

          <div className="content-area">
            {activeTab === 'inbox' && (
              <>
                <h3>Notifications</h3>
                {notifications && Object.keys(notifications).length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  Object.entries(notifications).map(([key, notification], index) => (
                    <div key={key} className="inbox-message">
                      <strong>{notification.message}</strong>
                      {/* Add more fields like description or timestamp if they exist */}
                      {notification.timestamp && (
                        <small>{new Date(notification.timestamp).toLocaleString()}</small>
                      )}
                    </div>
                  ))
                )}

                <h3>Alerts</h3>
                {alerts.length === 0 ? (
                  <p>No alerts</p>
                ) : (
                  alerts.map((alert, index) => (
                    <div key={index} className="inbox-message">
                      <strong>{alert.title}</strong>
                      <p>{alert.description}</p>
                      {/* If timestamp exists, display it, else skip */}
                      {alert.timestamp && <small>{new Date(alert.timestamp).toLocaleString()}</small>}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === 'announcements' && (
              <>
                {announcements.length === 0 ? (
                  <p>No announcements available</p>
                ) : (
                  announcements.map((announcement, index) => (
                    <div key={index} className="announcement">
                      <strong>Announcement</strong>
                      <p>{announcement.message}</p>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        <div className="notifications-panel">
          <h3>Latest Alert</h3>
          {alerts.length === 0 ? (
            <p>No alerts</p>
          ) : (
            <div className="real-time-notification">
              <div className="notification-alert">
                <strong>{alerts[alerts.length - 1].title}</strong>
                <p>{alerts[alerts.length - 1].description}</p>
                {/* Check if the timestamp exists before rendering */}
                {alerts[alerts.length - 1].timestamp && (
                  <small>{new Date(alerts[alerts.length - 1].timestamp).toLocaleString()}</small>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
