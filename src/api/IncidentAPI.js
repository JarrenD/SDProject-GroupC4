import express from 'express';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Load the service account JSON dynamically
const serviceAccountPath = path.resolve("C:\\Users\\Vinay\\OneDrive\\HRS 1D 01122021\\OneDrive\\Desktop\\Ruaans stuff\\Coms 3\\SDP\\key\\creativetutorial-ba1bf-firebase-adminsdk-9p4al-3b39e9b2a5.json");
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com/",
  storageBucket: "gs://creativetutorial-ba1bf.appspot.com"
});

const db = admin.database();
const bucket = admin.storage().bucket();

// Middleware to parse JSON bodies
app.use(express.json());

// POST /api/incidents - Create a new incident report
app.post('/api/incidents', async (req, res) => {
  try {
    const { type, description, timestamp, anonymous, photo, latitude, longitude } = req.body;
    const incidentId = Date.now().toString();

    let photoURL = null;
    if (photo) {
      const photoBuffer = Buffer.from(photo, 'base64');
      const file = bucket.file(`incident_photos/${incidentId}.jpg`);
      await file.save(photoBuffer);
      photoURL = file.publicUrl();
    }

    const incidentData = {
      type,
      description,
      photoURL,
      timestamp,
      anonymous,
      location: latitude && longitude ? { latitude, longitude } : null
    };

    await db.ref('Incident_Alerts/' + incidentId).set(incidentData);
    res.status(201).json({ message: "Incident reported successfully!", incidentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/incidents - Retrieve all incident reports
app.get('/api/incidents', async (req, res) => {
  try {
    const incidentsSnapshot = await db.ref('Incident_Alerts/').once('value');
    const incidents = incidentsSnapshot.val();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/incidents/:incident_id - Retrieve a specific incident report
app.get('/api/incidents/:incident_id', async (req, res) => {
  try {
    const { incident_id } = req.params;
    const incidentSnapshot = await db.ref('Incident_Alerts/' + incident_id).once('value');
    const incident = incidentSnapshot.val();
    if (incident) {
      res.status(200).json(incident);
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/incidents/:incident_id - Update an existing incident report
app.put('/api/incidents/:incident_id', async (req, res) => {
    try {
      const { incident_id } = req.params;
      const { type, description, timestamp,anonymous, photo, latitude, longitude } = req.body;
  
      // Construct the incidentData object
      const incidentData = {};
  
      if (type !== undefined) incidentData.type = type;
      if (description !== undefined) incidentData.description = description;
      if (timestamp !== undefined) incidentData.timestamp = timestamp;
      if (anonymous !== undefined) incidentData.anonymous = anonymous;
  
      // Handle the photo upload and update photoURL
      if (photo) {
        const photoBuffer = Buffer.from(photo, 'base64');
        const file = bucket.file(`incident_photos/${incident_id}.jpg`);
        await file.save(photoBuffer);
        incidentData.photoURL = file.publicUrl();
      }
  
      // Handle the location data as a nested object
      if (latitude !== undefined && longitude !== undefined) {
        incidentData.location = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        };
      }
  
      // Update the incident in the database
      await db.ref('Incident_Alerts/' + incident_id).update(incidentData);
  
      res.status(200).json({ message: "Incident updated successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE /api/incidents/:incident_id - Delete an incident report
app.delete('/api/incidents/:incident_id', async (req, res) => {
  try {
    const { incident_id } = req.params;

    // Delete the photo from storage if it exists
    const incidentSnapshot = await db.ref('Incident_Alerts/' + incident_id).once('value');
    const incident = incidentSnapshot.val();
    if (incident && incident.photoURL) {
      const file = bucket.file(`incident_photos/${incident_id}.jpg`);
      await file.delete();
    }

    // Delete the incident record from the database
    await db.ref('Incident_Alerts/' + incident_id).remove();
    res.status(200).json({ message: "Incident deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
