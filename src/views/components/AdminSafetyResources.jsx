import React, { useState } from 'react';

const AdminSafetyResources = () => {
    const [resources, setResources] = useState([
        { id: 1, title: 'Emergency Contact List ', type: 'PDF' },
        { id: 2, title: 'Campus Safety Guidelines ', type: 'DOC' },
        { id: 3, title: 'Evacuation Procedures ', type: 'PDF' },
    ]);

    return (
        <div className="card safety-resources">
            <h2 className="card-title">Safety Resources</h2>
            <div className="resource-list">
                {resources.map(resource => (
                    <div key={resource.id} className="resource-item">
                        <span>{resource.title}</span>
                        <span className="resource-type">{resource.type}</span>
                    </div>
                ))}
            </div>
            <button className="add-resource-btn">Add New Resource</button>
        </div>
    );
};

export default AdminSafetyResources;