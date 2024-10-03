import React, { useState } from 'react';

const AdminEmergencyAlertsPanel = () => {
    const [alert, setAlert] = useState('');

    const handleAlertChange = (e) => {
        setAlert(e.target.value);
    };

    const handleSendAlert = () => {
        if (alert.trim()) {
            // Send the alert to a backend service
            alert(`Emergency alert sent: ${alert}`);
            setAlert('');
        }
    };

    return (
        <div className="card emergency-alerts">
            <h2 className="card-title">Emergency Alerts Panel</h2>
            <textarea 
                className="alert-input" 
                value={alert} 
                onChange={handleAlertChange} 
                placeholder="Type an emergency alert..." 
            />
            <button className="send-alert-btn" onClick={handleSendAlert}>Send Alert</button>
        </div>
    );
};

export default AdminEmergencyAlertsPanel;