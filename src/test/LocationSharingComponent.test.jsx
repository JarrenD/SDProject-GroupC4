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
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

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

  test('displays error message when sharing location fails', async () => {
    // Mock the shareLocation method to return an error
    LocationController.prototype.shareLocation.mockResolvedValue({
      success: false,
      message: 'Failed to share location.',
    });

    render(<LocationSharingComponent />);

    // Trigger the button click
    fireEvent.click(screen.getByText('Share My Location'));

    // Check for the error message
    await waitFor(() => {
      expect(screen.getByText('Failed to share location.')).toBeInTheDocument();
    });
  });

  test('searches for venues and displays results', async () => {
    // Mock the API response for venue search
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, Name: 'Venue 1', Building: 'Building A' },
        { id: 2, Name: 'Venue 2', Building: 'Building B' },
      ],
    });
  
    render(<LocationSharingComponent />);
  
    // Simulate typing into the search input
    fireEvent.change(screen.getByPlaceholderText('Search for a venue...'), { target: { value: 'Venue' } });
  
    // Wait for venues to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Venue 1/i)).toBeInTheDocument();    
      expect(screen.getByText(/Venue 2/i)).toBeInTheDocument();    
    });
  });

  test('displays error message when fetching venues fails', async () => {
    // Mock the fetch API to simulate an error
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch venues'))
    );

    render(<LocationSharingComponent />);

    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText('Search for a venue...'), { target: { value: 'Venue' } });

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching venues. Please try again later.')).toBeInTheDocument();
    });
  });


  
  test('selects a venue and shares it', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, Name: 'Venue 1', Building: 'Building A' },
      ],
    });

    LocationController.prototype.shareVenue.mockResolvedValue({
      success: true,
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        timestamp: new Date().toISOString(),
      },
      message: 'Venue shared successfully!',
    });

    render(<LocationSharingComponent />);
    fireEvent.change(screen.getByPlaceholderText('Search for a venue...'), { target: { value: 'Venue' } });

    await waitFor(() => {
      expect(screen.getByText(/Venue 1/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Venue 1 - Building A'));

    await waitFor(() => {
      expect(screen.getByText('Selected Venue: Venue 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Share This Venue'));

    await waitFor(() => {
      expect(screen.getByText('Venue shared successfully!')).toBeInTheDocument();
    });
  });
});
