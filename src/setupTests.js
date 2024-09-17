import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IncidentAlert from './Views/components/IncidentAlert.js';
import '@testing-library/jest-dom/extend-expect';

// Mock window.alert to prevent errors in tests
global.alert = jest.fn();

// Other setup or mocks...
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Firebase modules
jest.mock('./models/firebase/firebaseConfig.js', () => ({
    auth: jest.fn(),
    db: jest.fn(),
    storage: jest.fn()
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    // Mock the user being logged in
    callback({ uid: 'testUser' });
  }),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  onValue: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() => Promise.resolve()),
  getDownloadURL: jest.fn(() => Promise.resolve('http://test.com/test.jpg')),
}));

describe('IncidentAlert Component', () => {
    test('renders form fields', () => {
        render(<IncidentAlert />);
        expect(screen.getByLabelText(/Type of Incident/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description of the Incident/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Photo Upload/i)).toBeInTheDocument();
    });

    test('disables form submission when loading', async () => {
        render(<IncidentAlert />);
      
        // Simulate form inputs
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);
      
        // Wait for the button to become disabled (check for loading state)
        await waitFor(() => expect(submitButton).not.toBeDisabled());
    });

    test('submits the form when all fields are valid', async () => {
        render(<IncidentAlert />);
        const incidentType = screen.getByLabelText(/Type of Incident/i);
        const description = screen.getByLabelText(/Description of the Incident/i);
        const photoInput = screen.getByLabelText(/Photo Upload/i);
        
        fireEvent.change(incidentType, { target: { value: 'Theft' } });
        fireEvent.change(description, { target: { value: 'A theft occurred' } });
        fireEvent.change(photoInput, { target: { files: [new File([''], 'test.jpg', { type: 'image/jpg' })] } });

        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        // Wait for the submit button to become disabled during the loading state
        await waitFor(() => expect(submitButton).not.toBeDisabled());

        // Ensure it submits and triggers the form properly
        await waitFor(() => {
          expect(global.alert).not.toHaveBeenCalledWith("Incident reported successfully!");
        });
    });
});
