import React, { useState } from 'react';
import './IncidentAlert.css';
import EXIF from 'exif-js';
import { auth, db, storage } from '../../models/firebase/firebaseConfig.js';
import { ref, set } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

function IncidentAlert() {
    const [incidentType] = useState('theft');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
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

                uploadIncidentData(incidentType, description, photo, latitude, longitude)
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

    return (
        <div className="container">
            <h1>Report an Incident</h1>
            <h2>Anonymous Reporting</h2>
            {loading && <p>Submitting your incident, please wait...</p>}
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
                    <label htmlFor="incidentDescription">Description of the Incident:</label>
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
                    <button disabled={loading} type="submit">Submit</button>
                    <button type="button" onClick={resetForm}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default IncidentAlert;
