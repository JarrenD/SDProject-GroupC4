import React, { useState } from "react";
import "./LocationSharingComponent.css";
import { LocationController } from "../../controllers/LocationController";

const LocationSharingComponent = () => {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const controller = new LocationController();

  const API_URL = "https://campus-infrastructure-management.azurewebsites.net/api/venues";
  const API_KEY = "kpy8PxJshr0KqzocQL2ZZuZIcNcKVLUOwuS8YVnogqSZNCvKcFHJa8kweD0sP8JlUOhWStMuKNCKf2ZZVPoGZjzNiWUodIVASAaOfcVNKb2bFapQ5L9a2WKzCTBWSfMG";

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
      setStatus("Location shared successfully!");
    } else {
      setStatus(result.message || "Error sharing location");
    }
  };

  const handleSearchVenues = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const venues = await response.json();
        const filteredVenues = venues.filter(venue =>
          venue.Name && venue.Name.toLowerCase().includes(query.toLowerCase())
        );
        setVenues(filteredVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setStatus("Error fetching venues. Please try again later.");
      }
    } else {
      setVenues([]);
    }
  };

  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    setStatus(`Selected venue: ${venue.Name}`);
    setVenues([]);
  };

  const handleShareVenue = async () => {
    if (!enabled) {
      setStatus("Please enable location services first");
      return;
    }
    setStatus("Sharing venue...");

    const result = await controller.shareVenue(selectedVenue);

    if (result.success) {
      setLocation(result.location);
      setStatus("Venue shared successfully!");
    } else {
      setStatus(result.message || "Error sharing venue");
    }
  };

  return (
    <div className="location-sharing-container">
      <h3>Location Sharing</h3>
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
        Share My Location
      </button>
      <div className="or-divider">OR</div>

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

      {selectedVenue && (
        <div className="selected-venue">
          <p>Selected Venue: {selectedVenue.Name}</p>
          <p>Building: {selectedVenue.Building}</p>
          <button onClick={handleShareVenue} disabled={!enabled}>
            Share This Venue
          </button>
        </div>
      )}

      {location && !selectedVenue && (
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