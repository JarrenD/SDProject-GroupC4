// src/views/LocationSharingComponent.jsx
import React, { useState } from "react";
import "../styles/LocationSharingComponent.css";
import { LocationController } from "../controllers/LocationController";
import { User } from "../models/User";

const LocationSharingComponent = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  // Example user ID for demonstration purposes
  const user = new User("exampleUserId");
  const controller = new LocationController(user);

  const handleShareLocation = async () => {
    setStatus("Sharing location...");
    const result = await controller.shareLocation(description);

    if (result.success) {
      setLocation(result.location);
      setStatus(result.message);
    } else {
      setStatus(`Error: ${result.message}`);
    }
  };

  return (
    <div className="location-sharing-container">
      <h3>Location Sharing</h3>
      <textarea
        placeholder="Enter a description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />
      <button onClick={handleShareLocation}>Share My Location</button>
      <div className="location-info">
        <p>Location:</p>
        <p>Latitude: {location ? location.latitude : "N/A"}</p>
        <p>Longitude: {location ? location.longitude : "N/A"}</p>
        {location && location.description && (
          <p>Description: {location.description}</p>
        )}
      </div>
      <p className="status">{status}</p>
    </div>
  );
};

export default LocationSharingComponent;
