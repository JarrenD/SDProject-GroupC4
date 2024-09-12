import React, { useState, useEffect } from 'react';
import './notifications.css';
import { fetchAlertsFromFirebase, removeFirebaseListener } from '../../models/firebase/firebaseConfig.js'; 

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);
  const [alerts, setAlerts] = useState([]);

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

    // Fetch alerts using the API
    const fetchAlerts = async () => {
      try {
        const fetchedAlerts = await fetchAlertsFromFirebase();
        setAlerts(fetchedAlerts);
      } catch (error) {
        console.error("Error fetching alerts: ", error);
      }
    };

    fetchAlerts();

    // Clean up Firebase listener on component unmount
    return () => removeFirebaseListener();
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
