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
import AdminIncidentAlert from './views/components/Admin_IncidentAlert.js';
import Logout from './views/pages/Logout.js';
import AdminLogin from './views/pages/AdminLoginPage.js';
import AdminDashboard from './views/pages/AdminDashboard.jsx';
import './App.css';
import AdminSidebar from './views/components/AdminSidebar.jsx';
import LocationAdmin from './views/pages/LocationAdmin.jsx'
import AdminNotifications from './views/pages/NotificationsAdmin.jsx'


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const [isAdmin,setIsAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );

  // Load authentication state from localStorage on initial load
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(()=>{
    localStorage.setItem('isAdmin',isAdmin.toString());
  },[isAdmin])
  

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist authentication state
  };

  const handleAdmin = () =>{
    setIsAdmin(true);
    localStorage.setItem('isAdmin','true');
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage handleLogin={handleLogin} />} />
        <Route path="/adminincident" element={<AdminIncidentAlert />} />
        <Route path="/admin-login" element = {<AdminLogin handleLogin={handleLogin} handleAdmin={handleAdmin}/>} />
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
        <Route 
          path="/logout" 
          element={isAuthenticated ? (
            <div className="app-container">
              <Navbar />
              <Sidebar />
              <div className="main-content">
                <Logout />
              </div>
            </div>
          ) : <Navigate to="/login" />} 
        />

        {/*admin routes*/}
        <Route
          path="/admin-dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} 
        />

        <Route 
          path="/admin-locations" 
          element={isAdmin ? (
            <div className="app-container">
              <AdminSidebar />
              <div className="main-content">
                <LocationAdmin />
              </div>
            </div>
          ) : <Navigate to="/admin-login" />} 
        />

        <Route 
          path="/admin-incidents" 
          element={isAdmin ? (
            <div className="app-container">
              <AdminSidebar />
              <div className="main-content">
              <AdminIncidentAlert />
              </div>
            </div>
          ) : <Navigate to="/admin-login" />} 
        />

        <Route 
          path="/admin-notifications" 
          element={isAdmin ? (
            <div className="app-container">
              <AdminSidebar />
              <div className="main-content">
              <AdminNotifications />
              </div>
            </div>
          ) : <Navigate to="/admin-login" />} 
        />

        {/* Redirect to login if the route is not found */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
