import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you have this CSS file in the correct path

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><Link to="/incident-reporting">Incident Reporting</Link></li>
        <li><Link to="/safety-resources">Safety Resources</Link></li>
        <li><Link to="/notification-centre">Notification Centre</Link></li>
        <li><Link to="/location-sharing">Location Sharing</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
