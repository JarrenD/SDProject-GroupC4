import React, { useEffect, useState } from 'react';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contacts from the API
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        // Convert the API data from object to array
        const contactsArray = Object.values(data);
        setContacts(contactsArray);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const formatPhoneNumbers = (numbers) => {
    return numbers.join(' or ');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            <p>Region: {contact.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
