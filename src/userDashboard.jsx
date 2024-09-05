import React from 'react';
import Sidebar from '../views/Sidebar';
import Navbar from '../views/Navbar';
import Header from '../views/Header';
import DashboardContent from '../views/DashboardContent';
import '../styles/UserDashboard.css';

function userDashboard() {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
}

export default userDashboard;