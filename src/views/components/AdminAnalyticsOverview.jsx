import React from 'react';

const AdminAnalyticsOverview = () => {
    const totalIncidents = 10;
    const openIncidents = 3;
    const resolvedIncidents = 7;
    const totalUsers = 50;

    return (
        <div className="card analytics-overview">
            <h2 className="card-title">Analytics Overview</h2>
            <div className="analytics-content">
                <p>Total Incidents: {totalIncidents}</p>
                <p>Open Incidents: {openIncidents}</p>
                <p>Resolved Incidents: {resolvedIncidents}</p>
                <p>Total Users: {totalUsers}</p>
            </div>
            <button className="view-reports-btn">View Detailed Reports</button>
        </div>
    );
};

export default AdminAnalyticsOverview;