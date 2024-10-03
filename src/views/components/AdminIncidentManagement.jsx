import React, { useState } from 'react';

const AdminIncidentManagement = () => {
    const [incidents, setIncidents] = useState([
        { id: 1, type: 'Theft', location: 'Chamber of mines', status: 'In Progress', timestamp: '2024-10-02T10:30:00' },
        { id: 2, type: 'Suspicious Activity', location: 'Yale Rd exit gate', status: 'In Progress', timestamp: '2024-10-02T11:45:00' },
        { id: 4, type: 'Vandalism', location: 'Tower', status: 'Resolved', timestamp: '2024-10-02T09:15:00' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setIncidents(incidents.map(incident => 
            incident.id === id ? { ...incident, status: newStatus } : incident
        ));
    };

    return (
        <div className="card incident-management">
            <h2 className="card-title">Incident Management</h2>
            <div className="incident-list">
                {incidents.map(incident => (
                    <div key={incident.id} className="incident-item">
                        <p>{incident.type} near {incident.location}</p>
                        <p>ID: {incident.id} - Reported: {new Date(incident.timestamp).toLocaleString()}</p>
                        <select 
                            value={incident.status}
                            onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                            className="status-select"
                        >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminIncidentManagement;