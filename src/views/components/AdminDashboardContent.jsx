import React from 'react';
import AdminIncidentManagement from './AdminIncidentManagement';
import AdminEmergencyAlertsPanel from './AdminEmergencyAlertsPanel';
import AdminUserRoleManagement from './AdminUserRoleManagement';
import AdminSafetyResources from './AdminSafetyResources';
import AdminRealTimeNotifications from './AdminRealTimeNotifications';
import AdminAnalyticsOverview from './AdminAnalyticsOverview';


const AdminDashboardContent = () => {

  return (
    <div className="dashboard-content">
      <AdminIncidentManagement />
      <AdminEmergencyAlertsPanel />
      <AdminUserRoleManagement />
      <AdminSafetyResources />
      <AdminRealTimeNotifications />
      <AdminAnalyticsOverview />
    </div>
  );
};

export default AdminDashboardContent;