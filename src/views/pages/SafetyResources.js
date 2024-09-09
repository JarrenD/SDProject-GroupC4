import React, { useState } from 'react';
import TopNav from '../components/TopNav.js'; // Adjusted path
import SafetyTips from '../components/SafetyTips.js'; // Adjusted path
import CampusSafetyPolicies from '../components/CampusSafetyPolicies.js'; // Adjusted path
import './SafetyResources.css'; // Make sure this file is correctly placed in pages directory

function SafetyResources() {
  const [activeSection, setActiveSection] = useState('SafetyTips');

  return (
    <div className="safety-resources">
      <TopNav setActiveSection={setActiveSection} />
      <div className="content">
        {activeSection === 'safetyTips' && <SafetyTips />}
        {activeSection === 'campusPolicies' && <CampusSafetyPolicies />}
      </div>
    </div>
  );
}

export default SafetyResources;
