import React from 'react';
import ExpandableCard from '../ExpandableCard';

const SafetyResourcesSection = () => {
  const emergencyContacts = [
    { name: 'Campus Security', number: '555-0123' },
    { name: 'Local Police', number: '911' },
    { name: 'Health Center', number: '555-0456' },
  ];

  const safetyTips = [
    "🔒 Always lock your car doors and keep valuables out of sight.",
    "🔦 Avoid walking alone at night; use the campus escort service.",
    "🕵️‍♂️ Report any suspicious activities immediately to campus security.",
    "🚶‍♀️ Use well-lit walkways and avoid isolated areas, especially at night.",
    "📱 Keep your mobile phone with you and fully charged in case of emergencies."
  ];

  return (
    <div className="safety-resources">
      <h3>Safety Resources</h3>
      <div className="card emergency-contacts">
        <h3>Emergency Contacts</h3>
        <p>Find contact information for campus security, medical services, and other emergency contacts.</p>
        <button>View Contacts</button>
      </div>
      <div className='card safety-tips'>
      <ExpandableCard title="Safety Tips" items={safetyTips} />
      </div>
      <button>View Campus Safety Policies</button>
    </div>
  );
};

export default SafetyResourcesSection;