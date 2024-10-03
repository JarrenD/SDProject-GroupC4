import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmergencyContacts from '../views/components/EmergencyContacts'; // Adjust the path based on your project structure

global.fetch = jest.fn();

describe('EmergencyContacts Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state', () => {
    render(<EmergencyContacts />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('renders error state when API request fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );
    render(<EmergencyContacts />);
    const errorMessage = await screen.findByText(/Failed to fetch contacts/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders emergency contacts from API', async () => {
    const mockContacts = {
      1: { id: 1, name: 'John Doe', phone: ['123-456', '789-101'], region: 'North' },
      2: { id: 2, name: 'Jane Smith', phone: ['234-567'], region: 'South' },
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockContacts),
      })
    );

    render(<EmergencyContacts />);

    const contactName1 = await screen.findByText('John Doe');
    const contactName2 = await screen.findByText('Jane Smith');

    expect(contactName1).toBeInTheDocument();
    expect(contactName2).toBeInTheDocument();
  });

});
