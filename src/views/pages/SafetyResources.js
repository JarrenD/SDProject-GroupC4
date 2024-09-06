import React, { useState } from 'react';
import TopNav from '../Components/TopNav.js'; // Adjusted path
import EmergencyContacts from '../Components/EmergencyContacts.js'; // Adjusted path
import SafetyTips from '../Components/SafetyTips.js'; // Adjusted path
import CampusSafetyPolicies from '../Components/CampusSafetyPolicies.js'; // Adjusted path
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
