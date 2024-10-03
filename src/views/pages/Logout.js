import React from 'react';
import { Link } from 'react-router-dom';
import './Logout.css'; // Import the CSS file

const Logout = () => {
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false'); // Update local storage
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="logout-container">
      <h2>Are you sure you want to log out?</h2>
      <div className="logout-buttons">
        <button className="logout-yes" onClick={handleLogout}>Yes</button>
        <Link to="/dashboard">
          <button className="logout-no">No</button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
