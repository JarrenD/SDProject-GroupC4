import React from 'react';
import SafetyResourcesSection from './SafetyResourcesSection';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
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
  const [showModal, setShowModal] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch latest alert from Firebase on component mount
    const alertsRef = ref(db, 'Incident_Alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedAlerts = data ? Object.values(data) : [];
      if (fetchedAlerts.length > 0) {
        const mostRecentAlert = fetchedAlerts[fetchedAlerts.length - 1]; // Get the latest alert
        setLatestAlert(mostRecentAlert);
        setShowModal(true); // Display the modal as soon as the latest alert is fetched
      }
    });

    // Clean up the Firebase listener
    return () => {
      if (alertsRef) {
        off(alertsRef);
      }
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    
    <div className="dashboard-content">
      <div className="card">
        <h3>Emergency Alert</h3>
        <p>Press for immediate help. Your location will be shared with campus security.</p>
        <button onClick={() => navigate('/location-sharing')}>Alert Campus Security</button>
      </div>

      <div className="card incident-reporting">
        <h3>Report Incident</h3>
        <p>Click to provide details of any suspicious or dangerous activities on campus.</p>
        <button onClick={()=> navigate('/incident-reporting')}>Report Now</button>
      </div>

      {/* Modal to display the latest alert
      {showModal && latestAlert && (
        <div className="modal">
          <div className="modal-content">
            <h3>{latestAlert.title}</h3>
            <p>{latestAlert.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )} */}
      <SafetyResourcesSection />
    </div>
  );
};

export default DashboardContent;
