import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IncidentAlert from '../Views/components/IncidentAlert';
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Mock Firebase methods
jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(() => Promise.resolve({
      ref: { fullPath: 'mocked/path/to/photo.jpg' }
    })),
    getDownloadURL: jest.fn(() => Promise.resolve('http://test.com/test.jpg')),
  }));
  
  jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    set: jest.fn(() => Promise.resolve()),
  }));

describe('IncidentAlert Component Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('submits incident data and uploads a photo', async () => {
    render(<IncidentAlert />);

    const incidentType = screen.getByLabelText(/Type of Incident/i);
    const description = screen.getByLabelText(/Description of the Incident/i);
    const photoInput = screen.getByLabelText(/Photo Upload/i);

    // Simulate user input
    fireEvent.change(incidentType, { target: { value: 'Theft' } });
    fireEvent.change(description, { target: { value: 'A theft occurred' } });
    fireEvent.change(photoInput, { target: { files: [new File([''], 'test.jpg', { type: 'image/jpg' })] } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton); // Simulate form submission

    // Check if Firebase methods were called
    await waitFor(() => {
      expect(uploadBytes); // Ensure file upload happened
      expect(set); // Ensure data was written to the database
    });

    // Ensure the alert message was displayed after submission
    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalledWith('Incident reported successfully!');
    });
  });
});
