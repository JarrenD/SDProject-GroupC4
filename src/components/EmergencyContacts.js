import React, { useState, useEffect } from 'react';
import './EmergencyContacts.css';

function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    // Replace with your Firebase API call
    const response = await fetch('YOUR_FIREBASE_API_ENDPOINT');
    const data = await response.json();
    setContacts(data);
  };

  return (
    <div className="emergency-contacts">
      <h2>Emergency Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <a href={`tel:${contact.phone}`}>{contact.name}: {contact.phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyContacts;
