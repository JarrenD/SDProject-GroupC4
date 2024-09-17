import React from 'react';
import './TopNav.css';

function TopNav({ setActiveSection }) {
  return (
    <div className="topnav">
      <button className="topnav-button" onClick={() => setActiveSection('safetyTips')}>Safety Tips</button>
      <button className="topnav-button" onClick={() => setActiveSection('campusPolicies')}>Campus Safety Policies</button>
      <div className="topnav-spacer"></div> {/* Spacer for the remaining space */}
    </div>
  );
}

export default TopNav;
