import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, equalTo, orderByChild, get } from "firebase/database";
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
  const [inboxMessages, setInboxMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch announcements
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = ref(db, 'announcements');
        const snapshot = await get(announcementsQuery);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedAnnouncements = data ? Object.values(data) : [];
          setAnnouncements(fetchedAnnouncements);
        } else {
          setAnnouncements([]);
        }
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    // Fetch alerts based on selected category
    const fetchAlerts = async (category) => {
      try {
        let alertsQuery;
        if (category === 'All') {
          alertsQuery = ref(db, 'Incident_Alerts');
        } else {
          alertsQuery = query(ref(db, 'Incident_Alerts'), orderByChild('type'), equalTo(category.toLowerCase().replace(' ', '-')));
        }

        const snapshot = await get(alertsQuery);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedAlerts = data ? Object.values(data) : [];
          setAlerts(fetchedAlerts);

          // Create inbox messages
          const newInboxMessages = fetchedAlerts.map(alert => ({
            title: alert.title,
            description: alert.description,
            timestamp: new Date(alert.timestamp).toLocaleString(),
            isNew: true,
            category: alert.type 
          }));
          setInboxMessages(newInboxMessages);
        } else {
          setAlerts([]);
          setInboxMessages([]);
        }
      } catch (error) {
        console.error("Error fetching alerts: ", error);
      }
    };

    fetchAnnouncements(); // Call to fetch announcements
    fetchAlerts(selectedCategory); // Call to fetch alerts

    return () => {};
  }, [selectedCategory]); // Dependency array includes selectedCategory to refetch on change

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter inbox messages based on selected category
  const filteredMessages = selectedCategory === 'All' ? inboxMessages : inboxMessages.filter(message => message.category === selectedCategory.toLowerCase().replace(' ', '-'));

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

          <div id="inbox-content" className="content-area" style={{ display: activeTab === 'inbox' ? 'block' : 'none' }}>
            <div className="dropdown">
              <label htmlFor="category-select">Filter by category:</label>
              <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="All">All</option>
                <option value="Theft">Theft</option>
                <option value="Injury">Injury</option>
                <option value="Traffic Jam">Traffic Jam</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {filteredMessages.length === 0 ? (
              <p>No messages in inbox</p>
            ) : (
              filteredMessages.map((message, index) => (
                <div key={index} className={`inbox-message ${message.isNew ? 'new-message' : ''}`}>
                  <strong>{message.title}</strong>
                  <p>{message.description}</p>
                  <small>{message.timestamp}</small>
                </div>
              ))
            )}
          </div>

          <div id="announcements-content" className="content-area" style={{ display: activeTab === 'announcements' ? 'block' : 'none' }}>
            {announcements.length === 0 ? (
              <p>No announcements available</p>
            ) : (
              announcements.map((announcement, index) => (
                <div key={index} className="announcement">
                  <div className="announcement-text">
                    <strong>{announcement.title}</strong>
                    <p>{announcement.message}</p> {/* Assuming the property for the message is named "message" */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="notifications-panel">
          <h3>Alerts</h3>
          <div className="real-time-notification">
            {alerts.length === 0 ? (
              <p>No new alerts</p>
            ) : (
              <div className="notification-alert">
                <strong>{alerts[alerts.length - 1].title}</strong>
                <p>{alerts[alerts.length - 1].description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;