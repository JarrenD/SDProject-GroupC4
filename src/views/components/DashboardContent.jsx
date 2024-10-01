import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Locate, AlarmCheck } from 'lucide-react';


// Firebase configuration
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
const auth = getAuth(app);

const DashboardContent = () => {
  const [latestAlert, setLatestAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('User');
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase listener to fetch the latest alert
    const alertsRef = ref(db, 'Incident_Alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const alerts = data ? Object.values(data) : [];
      if (alerts.length > 0) {
        setLatestAlert(alerts[alerts.length - 1]); // Get the latest alert
        setShowModal(true); // Show modal if there is an alert
      }
    });

    // Get user information
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, 'user/' + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.displayName) {
            setUserName(userData.displayName);
          }
        });
      }
    });

    // Set greeting based on time of day
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good afternoon');
      } else if (currentHour >= 18 && currentHour < 22) {
        setGreeting('Good evening');
      } else {
        setGreeting('Good night');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute

    return () => {
      off(alertsRef);
      unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="grid-container">
        
        {/* User Info Section */}
        <div className="card">
          <h3 className="card-title"> {userName}</h3>
          <p className="card-subtitle">Student</p>
          <p className="card-info">65 Empire Rd, Parktown, Johannesburg</p>
          <p className="card-location">location input</p>
        </div>

        {/* Nearest Security Office */}
        <div className="card emergency-card">
          <h3 className="card-title">Nearest Security Office</h3>
          <p className="card-info">Campus Security Office, West Campus</p>
          <button className="emergency-btn" onClick={() => navigate('/location-sharing')}>
            <AlarmCheck size={20} /> <p> Emergency </p>
          </button>
        </div>

        {/* Upload Evidence Section */}
        <div className="card">
          <h3 className="card-title">Report Incident</h3>
          <p className="card-info">Click to provide details of any suspicious or dangerous activities on campus.</p>
          <button onClick={() => navigate('/incident-reporting')} className="upload-btn"> Report
          </button>
        </div>

        {/* Live Tracking Section */}
        <div className="card live-tracking-card">
          <h3 className="card-title">Live Tracking</h3>
          <button className="tracking-btn" onClick={() => navigate('/live-tracking')}>
            <Locate size={20} /> Activate Live Tracking
          </button>
          <p className="card-info">Image and sound will be recorded when tracking is activated.</p>
        </div>
      </div>

      {/* Alert Modal */}
      {/* Its a bit annoying, will edit later */}
      {/* {showModal && latestAlert && (
        <div className="modal">
          <div className="modal-content" style={{ borderColor: getSeverityColor(latestAlert.severity) }}>
            <h3>{latestAlert.title}</h3>
            <p>{latestAlert.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DashboardContent;