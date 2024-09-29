// import React from 'react';

// const DashboardContent = () => {
//   return (
//     <div className="dashboard-content">
//       <div className="card">
//         <h3>Emergency Alert</h3>
//         <p>Press for immediate help. Your location will be shared with campus security.</p>
//         <button>Alert Campus Security</button>
//       </div>

//       <div className="card">
//         <h3>Report Incident</h3>
//         <p>Click to provide details of any suspicious or dangerous activities on campus.</p>
//         <button>Report Now</button>
//       </div>

//       <div className="card">
//         <h3>Recent Alerts</h3>
//         <ul>
//           <li>⚠️ Power outage expected in the West Campus area from 10 AM - 12 PM.</li>
//           <li>⚠️ Vehicle break-in reported near the main library. Stay alert.</li>
//           <li>⚠️ Water supply interruption on East Campus due to maintenance.</li>
//           <li>⚠️ Protest action planned at the Great Hall at 2 PM. Avoid the area.</li>
//           <li>⚠️ Suspicious package reported at the Science Stadium. Area cordoned off.</li>
//         </ul>
//       </div>

//       <div className="card">
//         <h3>Safety Tips</h3>
//         <ul>
//           <li>🔒 Always lock your car doors and keep valuables out of sight.</li>
//           <li>🔦 Avoid walking alone at night; use the campus escort service.</li>
//           <li>🕵️‍♂️ Report any suspicious activities immediately to campus security.</li>
//           <li>🚶‍♀️ Use well-lit walkways and avoid isolated areas, especially at night.</li>
//           <li>📱 Keep your mobile phone with you and fully charged in case of emergencies.</li>
//         </ul>
//       </div>

//       <div className="card">
//         <h3>Campus Resources</h3>
//         <p>Access essential resources like mental health support, counseling, and more.</p>
//         <button>View Resources</button>
//       </div>

//       <div className="card">
//         <h3>Emergency Contacts</h3>
//         <p>Find contact information for campus security, medical services, and other emergency contacts.</p>
//         <button>View Contacts</button>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;


import React from 'react';
import ExpandableCard from '../ExpandableCard';
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
  const recentAlerts = [
    "⚠️ Power outage expected in the West Campus area from 10 AM - 12 PM.",
    "⚠️ Vehicle break-in reported near the main library. Stay alert.",
    "⚠️ Water supply interruption on East Campus due to maintenance.",
    "⚠️ Protest action planned at the Great Hall at 2 PM. Avoid the area.",
    "⚠️ Suspicious package reported at the Science Stadium. Area cordoned off."
  ];

  const safetyTips = [
    "🔒 Always lock your car doors and keep valuables out of sight.",
    "🔦 Avoid walking alone at night; use the campus escort service.",
    "🕵️‍♂️ Report any suspicious activities immediately to campus security.",
    "🚶‍♀️ Use well-lit walkways and avoid isolated areas, especially at night.",
    "📱 Keep your mobile phone with you and fully charged in case of emergencies."
  ];
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

      <div className="card">
        <h3>Report Incident</h3>
        <p>Click to provide details of any suspicious or dangerous activities on campus.</p>
        <button onClick={()=> navigate('/incident-reporting')}>Report Now</button>
      </div>

      <ExpandableCard title="Recent Alerts" items={recentAlerts} />
      <ExpandableCard title="Safety Tips" items={safetyTips} />

      <div className="card">
        <h3>Campus Resources</h3>
        <p>Access essential resources like mental health support, counseling, and more.</p>
        <button>View Resources</button>
      </div>

      <div className="card">
        <h3>Emergency Contacts</h3>
        <p>Find contact information for campus security, medical services, and other emergency contacts.</p>
        <button>View Contacts</button>
      </div>

      {/* Modal to display the latest alert */}
      {showModal && latestAlert && (
        <div className="modal">
          <div className="modal-content">
            <h3>{latestAlert.title}</h3>
            <p>{latestAlert.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
