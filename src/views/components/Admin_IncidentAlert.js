import React, { useEffect, useState } from "react";
import "./Admin_IncidentAlert.css"; // Ensure you have the corresponding CSS file

const IncidentAdmin = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = `/api/incidents`; // Replace with your actual API URL for incidents

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        setError("Error fetching incidents: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [API_URL]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="incident-admin-container">
      <h1>Recent Incident Reports</h1>
      <table className="incident-table">
        <thead>
          <tr>
            <th>Incident Type</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(incidents).map(([id, incidentData]) => (
            <tr key={id}>
              <td>{incidentData.type}</td>
              <td>{incidentData.description}</td>
              <td>
                {incidentData.photoURL ? (
                  <img
                    src={incidentData.photoURL}
                    alt="Incident"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No photo available"
                )}
              </td>
              <td>{new Date(incidentData.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentAdmin;