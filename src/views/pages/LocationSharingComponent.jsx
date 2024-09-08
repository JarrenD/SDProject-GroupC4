// src/views/LocationSharingComponent.jsx
import React, { useState } from "react";
import "./LocationSharingComponent.css";
import { LocationController } from "../../controllers/LocationController";

const LocationSharingComponent = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  const controller = new LocationController();

  const handleShareLocation = async () => {
    setStatus("Sharing location...");
    const result = await controller.shareLocation();

    if (result.success) {
      setLocation(result.location);
      setStatus(result.message);
    } else {
      setStatus(`${result.message}`);
    }
  };

  return (
    <div className="location-sharing-container">
      <h3>Location Sharing</h3>
      <button onClick={handleShareLocation}>Share My Location</button>
      <div className="location-info">
        <p>Location:</p>
        <p>Latitude: {location ? location.latitude : "N/A"}</p>
        <p>Longitude: {location ? location.longitude : "N/A"}</p>
        {location && location.timestamp && (
          <p>Shared at: {new Date(location.timestamp).toLocaleString()}</p>
        )}
      </div>
      <p className="status">{status}</p>
    </div>
  );
};

export default LocationSharingComponent;
