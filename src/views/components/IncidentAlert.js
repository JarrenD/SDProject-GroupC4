import React, { useState } from 'react';
import './IncidentAlert.css';
import { useNavigate } from 'react-router-dom';
import EXIF from 'exif-js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "creativetutorial-ba1bf.appspot.com",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

function IncidentAlert() {
    const navigate = useNavigate();
    const [incidentType] = useState('theft');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            alert('You must be logged in to submit an incident.');
          }
        });
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!authenticated) {
            alert('You must be logged in to submit an incident.');
            return;
        }
        setLoading(true);
        if (photo) {
            EXIF.getData(photo, function() {
                const gpsLatitude = EXIF.getTag(this, "GPSLatitude");
                const gpsLongitude = EXIF.getTag(this, "GPSLongitude");

                let latitude = null;
                let longitude = null;

                if (gpsLatitude && gpsLongitude) {
                    latitude = gpsLatitude[0] + gpsLatitude[1] / 60 + gpsLatitude[2] / 3600;
                    longitude = gpsLongitude[0] + gpsLongitude[1] / 60 + gpsLongitude[2] / 3600;
                    if (EXIF.getTag(this, "GPSLatitudeRef") === "S") latitude = -latitude;
                    if (EXIF.getTag(this, "GPSLongitudeRef") === "W") longitude = -longitude;
                }

                uploadIncidentData(incidentType, description, photo, latitude, longitude);
            });
        } else {
            setLoading(false);
            alert("Please upload a photo.");
        }
    };

    const uploadIncidentData = (type, description, photo, latitude, longitude) => {
        const incidentId = Date.now().toString();

        const photoRef = storageRef(storage, 'incident_photos/' + incidentId + '_' + photo.name);
        uploadBytes(photoRef, photo)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(downloadURL => {
                set(ref(db, 'Incident_Alerts/' + incidentId), {
                    type,
                    description,
                    photoURL: downloadURL,
                    location: latitude && longitude ? { latitude, longitude } : null,
                    timestamp: new Date().toISOString()
                })
                .then(() => {
                    setLoading(false);
                    resetForm();
                    alert("Incident reported successfully!");
                })
                .catch(error => {
                    setLoading(false);
                    console.error("Error storing incident data: ", error);
                    alert("Failed to report incident: " + error.message);
                });
            })
            .catch(error => {
                setLoading(false);
                console.error("Error uploading photo: ", error);
                alert("Failed to upload photo: " + error.message);
            });
    };

    // Update the type and description when a type is selected
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
        setDescription(selectedType); // Automatically set description to the selected type
    };

    const resetForm = () => {
        setType('');
        setDescription('');
        setPhoto(null);
        document.getElementById('uploadPhoto').value = ''; // Reset the photo input
      };

    const handleExit = () => {
        navigate('/dashboard'); // Navigate to the dashboard page
    };

    return (
        <div className="incident-alert-wrapper">
            <div className="incident-alert-card">
                <button className="exit-button" onClick={handleExit}>&times;</button>
                <h2>Report an Incident</h2>
                <p className="subtitle">Anonymous Reporting</p>
                {loading && <p className="loading-indicator">Submitting your incident, please wait...</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="incidentType">Type of Incident:</label>
                        <select id="incidentType" value={type} onChange={handleTypeChange} disabled={loading}>
                            <option value="">Select Type</option>
                            <option value="Theft">Theft</option>
                            <option value="Injury">Injury</option>
                            <option value="Traffic Jam">Traffic Jam</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="incidentDescription">Description:</label>
                        <textarea
                            id="incidentDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please describe the incident..."
                            disabled={loading}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="uploadPhoto">Photo Upload:</label>
                        <input
                            type="file"
                            id="uploadPhoto"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            disabled={loading}
                        />
                    </div>

                    <div className="buttons">
                        <button className="submit-button" disabled={loading} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IncidentAlert;