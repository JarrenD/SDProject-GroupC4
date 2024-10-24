import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardContent = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      <div className="card incident-reporting">
        <h3>Incident Management</h3>
        <p>View and manage reported incidents across campus</p>
        <button onClick={() => navigate('/admin-incidents')}>Manage Incidents</button>
      </div>

      <div className="card emergency-sos">
        <h3>Emergency Alerts</h3>
        <p>Monitor and respond to emergency alerts in real-time</p>
        <button onClick={() => navigate('/admin-locations')}>View Alerts</button>
      </div>
    </div>
  );
};

export default AdminDashboardContent;