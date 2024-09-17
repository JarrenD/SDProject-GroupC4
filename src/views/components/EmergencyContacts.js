import React from 'react';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const contacts = [
    { name: 'Campus Health and Wellness Centre', phone: ['011 717 9111', '011 717 9113'] },
    { name: 'Wits Protection Services: Braamfontein Campus East', phone: ['011 717 4444', '011 717 6666'] },
    { name: 'Wits Protection Services: Braamfontein Campus West', phone: ['011 717 1842'] },
    { name: 'Wits Protection Services: Health Sciences Campus', phone: ['011 717 2222', '011 717 2232'] },
    { name: 'Wits Protection Services: Education Campus', phone: ['011 717 3340'] },
    { name: 'Wits Protection Services: Business School Campus', phone: ['011 717 3589'] },
    { name: 'Occupational Health and Safety / Emergency Response Coordinator', phone: ['011 717 9192', '084 627 3591'] },
    { name: 'Counselling and Careers Development Unit', phone: ['011 717 9140'] },
    { name: 'Disability Rights Unit', phone: ['011 717 9151'] },
    { name: 'Employee Relations', phone: ['011 717 1513'] },
    { name: 'Gender Equity Office', phone: ['011 717 9790'] },
    { name: 'Wits Integrity Hotline', phone: ['082 938 4569'] },
    { name: 'Staff support: Life Health Services', phone: ['0800 004 770'] },
    { name: 'Transformation and Employment Equity Office', phone: ['011 717 1462'] }
  ];

  const formatPhoneNumbers = (numbers) => {
    return numbers.join(' or ');
  };

  return (
    <div className="contacts-container">
      <h2>Emergency Contacts</h2>
      <div className="contacts-grid">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
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
