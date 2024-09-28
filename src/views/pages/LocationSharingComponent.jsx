// src/views/LocationSharingComponent.jsx
import React, { useState } from "react";
import "./LocationSharingComponent.css";
import { LocationController } from "../../controllers/LocationController";

const LocationSharingComponent = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");  // Set to an empty string
  const [searchQuery, setSearchQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const controller = new LocationController();

  // API URL ***hide this***
  const API_URL = "https://campus-infrastructure-management.azurewebsites.net/api/venues";
  const API_KEY = "kpy8PxJshr0KqzocQL2ZZuZIcNcKVLUOwuS8YVnogqSZNCvKcFHJa8kweD0sP8JlUOhWStMuKNCKf2ZZVPoGZjzNiWUodIVASAaOfcVNKb2bFapQ5L9a2WKzCTBWSfMG";

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

  const handleSearchVenues = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "x-api-key": API_KEY, // Attach API key to the headers
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const venues = await response.json();
        // Filter venues safely
        const filteredVenues = venues.filter(venue => venue.Name && venue.Name.toLowerCase().includes(query.toLowerCase()));
        setVenues(filteredVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setStatus("Error fetching venues. Please try again later.");
      }
    } else {
      setVenues([]); // Clear the venue list if the query is too short
    }
  };

  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    setStatus(`Selected venue: ${venue.Name}`);  // Use venue.Name for the correct case
    setVenues([]); // Clear the dropdown
  }

  const handleShareVenue = async () => {
    setStatus("Sharing venue...");

    const result = await controller.shareVenue(selectedVenue);

    if (result.success) {
      setLocation(result.location);
      setStatus(result.message);
    } else {
      setStatus(`${result.message}`);
    }
  }

  return (
    <div className="location-sharing-container">
      <h3>Location Sharing</h3>
      <div className="option-buttons">
        <button onClick={handleShareLocation}>Share My Location</button>
        <span style={{ margin: "0 10px" }}>or</span>
      </div>

      {/* Venue search input */}
      <div className="venue-search">
        <input
          type="text"
          placeholder="Search for a venue..."
          value={searchQuery}
          onChange={(e) => handleSearchVenues(e.target.value)}
        />
        {venues.length > 0 && (
          <ul className="venue-list">
            {venues.map((venue) => (
              <li key={venue.id} onClick={() => handleSelectVenue(venue)}>
                {venue.Name} - {venue.Building}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display selected venue info */}
      {selectedVenue && (
        <div className="selected-venue">
          <p>Selected Venue: {selectedVenue.Name}</p>
          <p>Building: {selectedVenue.Building}</p>
          <button onClick={handleShareVenue}>Share This Venue</button>
        </div>
      )}

      {/* Display location info if shared */}
      {location && !selectedVenue && ( // Show location info only when sharing location
        <div className="location-info">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {location.timestamp && (
            <p>Shared at: {new Date(location.timestamp).toLocaleString()}</p>
          )}
        </div>
      )}

      <p className="status">{status}</p>
    </div>
  );
};

export default LocationSharingComponent;