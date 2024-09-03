import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

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
const auth = getAuth(app);

const cancel = document.getElementById('cancel');
const incidentForm = document.getElementById("incidentForm");

incidentForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const incidentDescription = document.getElementById('incidentDescription').value;
    const incidentType = document.getElementById('incidentType').value;
    const photo = document.getElementById("uploadPhoto").files[0];

    // Check if the photo has EXIF data with GPS coordinates
    EXIF.getData(photo, function() {
      const gpsLatitude = EXIF.getTag(this, "GPSLatitude");
      const gpsLongitude = EXIF.getTag(this, "GPSLongitude");
  
      if (gpsLatitude && gpsLongitude) {
        const latitude = gpsLatitude[0] + gpsLatitude[1] / 60 + gpsLatitude[2] / 3600;
        const longitude = gpsLongitude[0] + gpsLongitude[1] / 60 + gpsLongitude[2] / 3600;
  
        if (EXIF.getTag(this, "GPSLatitudeRef") === "S") latitude = -latitude;
        if (EXIF.getTag(this, "GPSLongitudeRef") === "W") longitude = -longitude;
  
        uploadIncidentData(incidentType, incidentDescription, photo, latitude, longitude);
      } else {
        alert("No GPS data found in the image. Please enter the coordinates manually or take the picture again with location enabled.");
      }
    });
  });
  
  function uploadIncidentData(type, description, photo, latitude, longitude) {
    // Create a unique ID for the incident
    const incidentId = Date.now().toString();
  
    // Upload photo to Firebase Storage
    const photoRef = storageRef(storage, 'incident_photos/' + incidentId + '_' + photo.name);
    uploadBytes(photoRef, photo)
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(downloadURL => {
        // Store incident data in Firebase Realtime Database
        set(ref(db, 'Incident_Alerts/' + incidentId), {
          type: type,
          description: description,
          photoURL: downloadURL,
          location: {
            latitude: latitude,
            longitude: longitude
          },
          timestamp: new Date().toISOString()
        })
        .then(() => {
          alert("Incident reported successfully!");
        })
        .catch(error => {
          console.error("Error storing incident data: ", error);
          alert("Failed to report incident: " + error.message);
        });
      })
      .catch(error => {
        console.error("Error uploading photo: ", error);
        alert("Failed to upload photo: " + error.message);
      });
  }

if (incidentType) {
    incidentType.addEventListener('change', function() {
        const selectedValue = this.value;
        const incidentDescription = document.getElementById('incidentDescription');

        // Ensure the incidentDescription element exists before modifying it
        if (incidentDescription) {
            // Clear the textarea and set it to the selected value
            if (selectedValue !== 'other') {
                incidentDescription.value = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
            } else {
                incidentDescription.value = '';
            }
        }
    });
    if (cancel) {
        cancel.addEventListener('click', function() {
            // Clear the form or redirect
            incidentDescription.value = '';
            uploadPhoto.value = '';
            incidentType.value = 'theft'; // Reset to default

        });
    }
}
