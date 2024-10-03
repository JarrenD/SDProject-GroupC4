import React, { useState } from 'react';

const AdminRealTimeNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    setNotifications([
        { id: 1, message: 'New incident reported', timestamp: '2024-10-02T12:00:00' },
        { id: 2, message: 'Safety drill scheduled for tomorrow', timestamp: '2024-10-02T11:30:00' },
        { id: 3, message: 'Updated safety guidelines available', timestamp: '2024-10-02T10:45:00' },
    ]);

    return (
        <div className="card real-time-notifications">
            <h2 className="card-title">Real-Time Notifications</h2>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <p className="notification-timestamp">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRealTimeNotifications;