import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IncidentAlert from '../views/components/IncidentAlert';  // Adjust the import path if necessary
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Mock Firebase dependencies
jest.mock('firebase/app', () => ({
    getApps: jest.fn(() => []),  // No apps initialized by default
    getApp: jest.fn(() => ({ name: 'mockApp' })),  // Return a mock app
    initializeApp: jest.fn(() => ({ name: 'mockApp' }))  // Return a mock initialized app
  }));
  jest.mock('firebase/auth');
  jest.mock('firebase/database');
  jest.mock('firebase/storage');
jest.mock('exif-js', () => ({
  getData: jest.fn((photo, callback) => callback()),
  getTag: jest.fn(() => null),
}));

beforeEach(() => {
  // Clear mocks before each test
  jest.clearAllMocks();
});

describe('IncidentAlert Component', () => {
  it('renders the component correctly', () => {
    render(<IncidentAlert />);
    expect(screen.getByText(/Report an Incident/i)).toBeInTheDocument();
    expect(screen.getByText(/Anonymous Reporting/i)).toBeInTheDocument();
  });

  it('displays authentication alert if not authenticated', async () => {
    // Mock onAuthStateChanged to simulate an unauthenticated user
    onAuthStateChanged.mockImplementation((auth, callback) => callback(null));
    
    // Mock window.alert function
    const originalAlert = window.alert;
    window.alert = jest.fn();
    
    render(<IncidentAlert />);
    
    // Try submitting the form as an unauthenticated user
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
    
    await waitFor(() => {
      // Check if the alert was called with the expected message
      expect(window.alert).toHaveBeenCalledWith('You must be logged in to submit an incident.');
    });

    // Restore the original alert function
    window.alert = originalAlert;
  });

  it('shows an error if the photo is not uploaded', async () => {
    const mockUser = { uid: '1234' };
    onAuthStateChanged.mockImplementation((auth, callback) => callback(mockUser));

    // Mock the window.alert function
    const originalAlert = window.alert;
    window.alert = jest.fn();

    render(<IncidentAlert />);

    // Set incident type but no photo
    fireEvent.change(screen.getByLabelText(/Type of Incident:/i), {
      target: { value: 'Theft' },
    });

    // Submit the form without a photo
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      // Check if the alert was called with the expected message
      expect(window.alert).toHaveBeenCalledWith('Please upload a photo.');
    });

    // Restore the original alert function
    window.alert = originalAlert;
  });

  it('resets the form on cancel', () => {
    render(<IncidentAlert />);

    fireEvent.change(screen.getByLabelText(/Type of Incident:/i), {
      target: { value: 'Theft' },
    });

    fireEvent.change(screen.getByLabelText(/Description of the Incident:/i), {
      target: { value: 'Description of the theft' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(screen.getByLabelText(/Type of Incident:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description of the Incident:/i)).toHaveValue('');
  });
});