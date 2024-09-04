import React, { useState } from 'react';
import TopNav from '../components/TopNav'; // Adjusted path
import EmergencyContacts from '../components/EmergencyContacts'; // Adjusted path
import SafetyTips from '../components/SafetyTips'; // Adjusted path
import CampusSafetyPolicies from '../components/CampusSafetyPolicies'; // Adjusted path
import './SafetyResources.css'; // Make sure this file is correctly placed in pages directory

function SafetyResources() {
  const [activeSection, setActiveSection] = useState('emergencyContacts');

  return (
    <div className="safety-resources">
      <TopNav setActiveSection={setActiveSection} />
      <div className="content">
        {activeSection === 'emergencyContacts' && <EmergencyContacts />}
        {activeSection === 'safetyTips' && <SafetyTips />}
        {activeSection === 'campusPolicies' && <CampusSafetyPolicies />}
      </div>
    </div>
  );
}

export default SafetyResources;
