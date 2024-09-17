// src/views/LocationSharingComponent.jsx
import React, { useState } from "react";
import "./LocationSharingComponent.css";
import { LocationController } from "../../controllers/LocationController";


const LocationServices = () => {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  const controller = new LocationController();

  const handleToggle = () => {
    setEnabled(!enabled);
    if (!enabled) {
      setStatus("Location services enabled");
    } else {
      setStatus("Location services disabled");
      setLocation(null);
    }
  };

  const handleShareLocation = async () => {
    if (!enabled) {
      setStatus("Please enable location services first");
      return;
    }
    setStatus("Sharing location...");
    const result = await controller.shareLocation();

    if (result.success) {
      setLocation(result.location);
      setStatus("Location shared with campus security");
    } else {
      setStatus(`Failed to share location: ${result.message}`);
    }
  };

  return (
    <div className="location-services">
      <h2>Location Services</h2>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <p>{enabled ? 'GPS Tracking Enabled' : 'GPS Tracking Disabled'}</p>
      <button 
        onClick={handleShareLocation} 
        disabled={!enabled}
        className="share-button"
      >
        Share Location with Campus Security
      </button>
      {location && (
        <div className="location-info">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Shared at: {new Date(location.timestamp).toLocaleString()}</p>
        </div>
      )}
      <p className="status">{status}</p>
    </div>
  );
};

export default LocationServices;