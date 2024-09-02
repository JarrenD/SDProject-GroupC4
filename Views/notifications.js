import React, { useState, useEffect } from 'react';
import './style.css'; // Ensure this path is correct

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Load announcements data
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
            <div className="notification-caution">
              <strong>Caution: Due to heavy rain, roads on campus will be slippery.</strong>
              <p>Due to heavy rains and flooding, roads on campus will be slippery. Be mindful of your speed limit.</p>
            </div>
            <div className="notification-emergency">
              <strong>Emergency: COVID-19 exposure on campus.</strong>
              <p>There have been three confirmed cases of COVID-19 on campus, two were identified in MSL and 1 was identified in the Chamber of Mines. If you were in contact with the infected individuals or were in these areas within the past 24 hours get tested IMMEDIATELY.</p>
            </div>
            <div className="notification-safe">
              <strong>Safe: Snake captured on campus.</strong>
              <p>The snake that was detected at Law Lawns at 11:45 has been captured by the Snake Safety Association. All activities around this area may resume as normal.</p>
            </div>
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
          <h3>Real-Time Notifications</h3>
          <div className="real-time-notification">
            <p>No new notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
