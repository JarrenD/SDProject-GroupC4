import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push } from "firebase/database";
import React, { useState, useEffect } from 'react';
import './notifications.css';

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

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState({});

const fetchRoutes = async () => {
  try {
    const response = await fetch('https://virtserver.swaggerhub.com/WendyMaboa/GPSTracking/1.0.0/routes', {
      headers: {
        'accept': 'application/json'
      }
    });
    const data = await response.json();
    console.log('Fetched route data:', data);
    
    // Transform mock data into more realistic data for testing
    return data.map((route, index) => ({
      id: route.id === 'string' ? `route-${index + 1}` : route.id,
      name: route.name === 'string' ? `Route ${index + 1}` : route.name,
      coordinates: route.coordinates
    }));
  } catch (error) {
    console.error("Error fetching routes: ", error);
    return [];
  }
};

const pushRouteNotification = async (route) => {
  const notificationRef = ref(db, 'notifications');
  const routeName = route.name && typeof route.name === 'string' ? route.name : `Route ${route.id}`;
  const newNotification = {
    message: `New route available: ${routeName}`,
    timestamp: Date.now(),
    type: 'route',
  };
  await push(notificationRef, newNotification);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementsSnapshot, alertsSnapshot, notificationsSnapshot] = await Promise.all([
          get(ref(db, 'announcements')),
          get(ref(db, 'Incident_Alerts')),
          get(ref(db, 'notifications'))
        ]);

        setAnnouncements(announcementsSnapshot.exists() ? Object.values(announcementsSnapshot.val()) : []);
        setAlerts(alertsSnapshot.exists() ? Object.values(alertsSnapshot.val()) : []);
        const notificationsData = notificationsSnapshot.exists() ? notificationsSnapshot.val() : {};
        setNotifications(notificationsData);

        const routes = await fetchRoutes();
        for (const route of routes) {
          const existingNotifications = Object.values(notificationsData).some(
            (notification) => notification.message.includes(route.name) || notification.message.includes(route.id)
          );

          if (!existingNotifications) {
            await pushRouteNotification(route);
          } else {
            console.log(`Notification for this route ${route.name} (ID: ${route.id}) already exists.`);
          }
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
                {Object.keys(notifications).length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  Object.entries(notifications).map(([key, notification]) => (
                    <div key={key} className="inbox-message">
                      <strong>{notification.type === 'route' ? 'Route Update' : 'Notification'}</strong>
                      <p>{notification.message}</p>
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