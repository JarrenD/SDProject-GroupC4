import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationSharingComponent from '../views/pages/LocationSharingComponent';
import { LocationController } from '../controllers/LocationController';

// Mock the LocationController and its method
jest.mock('../controllers/LocationController');

describe('LocationSharingComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<LocationSharingComponent />);
    expect(screen.getByText('Location Sharing')).toBeInTheDocument();
    expect(screen.getByText('Share My Location')).toBeInTheDocument();
  });

  test('displays location info correctly if available', async () => {
    // Mock the shareLocation method to return location data
    LocationController.prototype.shareLocation.mockResolvedValue({
      success: true,
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        timestamp: new Date().toISOString(),
      },
      message: 'Location shared successfully!',
    });

    render(<LocationSharingComponent />);

    // Trigger the button click
    fireEvent.click(screen.getByText('Share My Location'));

    // Check for location info
    await waitFor(() => {
      expect(screen.getByText('Latitude: 34.0522')).toBeInTheDocument();
      expect(screen.getByText('Longitude: -118.2437')).toBeInTheDocument();
    });
  });

  test('displays location info correctly if available', async () => {
    // Mock the shareLocation method to return location data
    LocationController.prototype.shareLocation.mockResolvedValue({
      success: true,
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        timestamp: new Date().toISOString(),
      },
      message: 'Location shared successfully!',
    });

    render(<LocationSharingComponent />);

    // Trigger the button click
    fireEvent.click(screen.getByText('Share My Location'));

    // Check for location info
    await waitFor(() => {
      expect(screen.getByText('Latitude: 34.0522')).toBeInTheDocument();
      expect(screen.getByText('Longitude: -118.2437')).toBeInTheDocument();
    });
  });
});
