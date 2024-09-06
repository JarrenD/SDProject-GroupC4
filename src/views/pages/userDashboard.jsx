import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import DashboardContent from '../Components/DashboardContent';
import '../../styles/UserDashboard.css';

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