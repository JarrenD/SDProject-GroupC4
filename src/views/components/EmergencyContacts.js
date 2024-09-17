import React, { useEffect, useState } from 'react';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://polite-pond-04aadc51e.5.azurestaticapps.net/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        // Convert object into an array of contacts
        const contactsArray = Object.values(data);
        setContacts(contactsArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const formatPhoneNumbers = (numbers) => {
    return numbers.join(' or ');
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="contacts-container">
      <h2>Emergency Contacts</h2>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.name}</h3>
            <p className="phone-number">
              {formatPhoneNumbers(contact.phone).split(' or ').map((number, i) => (
                <a href={`tel:${number}`} key={i} className="phone-link">
                  {number}
                </a>
              )).reduce((prev, curr) => [prev, ' or ', curr])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
