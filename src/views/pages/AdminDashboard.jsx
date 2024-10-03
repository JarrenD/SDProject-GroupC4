import React from 'react';
import AdminDashboardContent from '../components/AdminDashboardContent.jsx';
import AdminSidebar from '../components/AdminSidebar.jsx';
import AdminFooter from '../components/AdminFooter.jsx';
import './AdminDashboard.css'

function AdminDashboard() {
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminDashboardContent />
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminDashboard;