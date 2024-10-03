import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';
import CampusSafetyFooter from '../components/Footer';
import './UserDashboard.css';

function userDashboard() {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Header />
        <DashboardContent />
        <CampusSafetyFooter />
      </div>
    </div>
  );
}

export default userDashboard;