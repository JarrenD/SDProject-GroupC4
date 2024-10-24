import React from 'react';
import AdminDashboardContent from '../components/AdminDashboardContent.jsx';
import AdminSidebar from '../components/AdminSidebar.jsx';
import AdminFooter from '../components/AdminFooter.jsx';
import AdminDashboardSlider from '../components/AdminDashboardSlider.jsx';
import './AdminDashboard.css'

function AdminDashboard() {
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminDashboardSlider />
        <AdminDashboardContent />
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminDashboard;