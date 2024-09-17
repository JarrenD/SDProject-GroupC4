import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmergencyContacts from '../views/components/EmergencyContacts'; // Adjust the path based on your project structure

describe('EmergencyContacts Component', () => {
  test('renders Emergency Contacts heading', () => {
    render(<EmergencyContacts />);
    
    // Check if the heading is rendered
    expect(screen.getByRole('heading', { name: /Emergency Contacts/i })).toBeInTheDocument();
  });

  test('renders all contact names and phone numbers', () => {
    render(<EmergencyContacts />);
    
    // Contacts data to match
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
      { name: 'Transformation and Employment Equity Office', phone: ['011 717 1462'] },
    ];

    // Check if each contact name is rendered
    contacts.forEach(contact => {
      expect(screen.getByText(contact.name)).toBeInTheDocument();
    });

    // Check if each phone number is rendered and is a valid tel link
    contacts.forEach(contact => {
      contact.phone.forEach(phone => {
        const phoneLink = screen.getByText(phone);
        expect(phoneLink).toBeInTheDocument();
        expect(phoneLink).toHaveAttribute('href', `tel:${phone}`);
      });
    });
  });
});
