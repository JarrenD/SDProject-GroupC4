import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/pages/LoginPage.js';
import SignUpPage from './views/pages/SignUpPage.js';
import SafetyResources from './views/pages/SafetyResources.js';
import IncidentReporting from './views/components/IncidentAlert.js';
import NotificationCentre from './views/pages/notifications.js';
import EmergencyContacts from './views/components/EmergencyContacts.js';
import LocationSharing from './views/pages/LocationSharingComponent.jsx';
import Navbar from './views/components/Navbar.jsx';
import Sidebar from './views/components/Sidebar.jsx';
import UserDashboard from './views/pages/userDashboard.jsx';
//import AdminIncidentAlert from './views/components/Admin_IncidentAlert.js';
import './App.css';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  // Load authentication state from localStorage on initial load
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);
  

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist authentication state
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage handleLogin={handleLogin} />} />
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/safety-resources" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <SafetyResources />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />
        <Route 
          path="/incident-reporting" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <IncidentReporting />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />
        <Route 
          path="/emergency-contacts" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <EmergencyContacts />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />
        <Route 
          path="/notification-centre" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <NotificationCentre />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />
        <Route 
          path="/location-sharing" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <LocationSharing />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />

        {/* Redirect to login if the route is not found */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
