import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SafetyResources from './pages/SafetyResources';
import IncidentReporting from './pages/IncidentReporting';
import NotificationCentre from './pages/NotificationCentre';
import LocationSharing from './pages/LocationSharing';
import Navbar from './components/Navbar';

const AppContent = () => {
  const location = useLocation();
  
  // Check if the current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {!isAuthPage && <Navbar />}
      <div style={{ flex: 1, marginLeft: isAuthPage ? 0 : '200px', padding: '0px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/safety-resources" element={<SafetyResources />} />
          <Route path="/incident-reporting" element={<IncidentReporting />} />
          <Route path="/notification-centre" element={<NotificationCentre />} />
          <Route path="/location-sharing" element={<LocationSharing />} />
          {/* Redirect any unmatched routes to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
