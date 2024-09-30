import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Firebase configuration (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
  authDomain: "creativetutorial-ba1bf.firebaseapp.com",
  databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-ba1bf",
  storageBucket: "creativetutorial-ba1bf",
  messagingSenderId: "945665449612",
  appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Use Realtime Database instead of Firestore

const AdminNotificationsPage = () => {
  const [title, setTitle] = useState(''); // Stores the type of notification (Emergency Alert or Announcement)
  const [message, setMessage] = useState(''); // Stores the message for the notification
  const [recipientType, setRecipientType] = useState('all'); // Stores the recipient type
  const [showToast, setShowToast] = useState(false); // For showing a success message after submission
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Choose collection (node) based on the title
      const collectionName = title === "Emergency Alert" ? "notifications" : "announcements";

      // Define document structure/schema
      const notificationData = {
        title,          // Notification title (string)
        message,        // Notification message (string)
        recipientType,  // Recipient type (string)
        createdAt: new Date().toISOString(), // Timestamp (ISO string format)
      };

      // Create a reference to the correct collection (node) in Realtime Database
      const notificationRef = ref(db, `${collectionName}`);

      // Add new notification to the Realtime Database (with auto-generated key)
      await push(notificationRef, notificationData);

      console.log(`Notification sent to ${collectionName} node in Firebase Realtime Database`);
      setShowToast(true); // Show toast notification after success
      setTimeout(() => setShowToast(false), 3000);

      // Clear form after submission
      setTitle('');
      setMessage('');
      setRecipientType('all');
    } catch (error) {
      console.error("Error sending notification: ", error);
      alert("Failed to send notification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Send Notifications</h1>
      <form onSubmit={handleSendNotification} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Notification Type Dropdown */}
        <div>
          <label htmlFor="title">Notification Type:</label>
          <select
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          >
            <option value="">Select Notification Type</option>
            <option value="Emergency Alert">Emergency Alert</option>
            <option value="Announcement">Announcement</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            required
            rows={4}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Recipient Type Dropdown */}
        <div>
          <label htmlFor="recipientType">Recipients:</label>
          <select
            id="recipientType"
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Notification'}
        </button>
      </form>

      {/* Success Toast Message */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}>
          Notification sent successfully!
        </div>
      )}
    </div>
  );
};

export default AdminNotificationsPage;
