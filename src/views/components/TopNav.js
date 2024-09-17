import React, { useEffect } from 'react';
import './TopNav.css';

function TopNav({ setActiveSection }) {
  // Use useEffect to set the default section on the first render
  useEffect(() => {
    setActiveSection('safetyTips');
  }, [setActiveSection]);

  return (
    <div className="topnav">
      <button className="topnav-button" onClick={() => setActiveSection('safetyTips')}>Safety Tips</button>
      <button className="topnav-button" onClick={() => setActiveSection('campusPolicies')}>Campus Safety Policies</button>
      <div className="topnav-spacer"></div> {/* Spacer for the remaining space */}
    </div>
  );
}

export default TopNav;
