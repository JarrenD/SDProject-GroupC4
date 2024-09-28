// src/views/pages/LocationAdmin.jsx
import React, { useEffect, useState } from "react";
import "./LocationAdmin.css"; // Ensure you have the corresponding CSS file

const LocationAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://polite-pond-04aadc51e.5.azurestaticapps.net/api/location"; // Replace with your actual API URL

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }

        const data = await response.json();
        setLocations(data);
      } catch (error) {
        setError("Error fetching locations: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [API_URL]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="location-admin-container">
      <h1>Recent Location Shares</h1>
      <table className="location-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Location Type</th>
            <th>Details</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(locations).map(([userId, locationData]) => (
            <tr key={userId}>
              <td>{userId}</td>
              <td>{locationData.venue ? "Venue" : "Coordinates"}</td>
              <td>
                {locationData.venue ? (
                  `${locationData.venue.Name} - ${locationData.venue.Building}`
                ) : (
                  `Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}`
                )}
              </td>
              <td>{new Date(locationData.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationAdmin;
