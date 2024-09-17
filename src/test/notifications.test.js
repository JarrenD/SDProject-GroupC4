import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // For better assertions
import NotificationCenter from '../views/notifications';
import { fetchAlertsFromFirebase, removeFirebaseListener } from '../api/firebaseAPI';

// Mock the Firebase API functions
jest.mock('../api/firebaseAPI', () => ({
  fetchAlertsFromFirebase: jest.fn(),
  removeFirebaseListener: jest.fn(),
}));

describe('NotificationCenter Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to the mock before each test
    fetchAlertsFromFirebase.mockClear();
    removeFirebaseListener.mockClear();
  });

  test('renders component with default announcements and no alerts', () => {
    render(<NotificationCenter />);

    // Check if static announcements are displayed
    expect(screen.getByText('Lock Your Car Doors:')).toBeInTheDocument();
    expect(screen.getByText('Speed Limit:')).toBeInTheDocument();
    expect(screen.getByText('Phone Theft:')).toBeInTheDocument();

    // Ensure no alerts are shown initially
    expect(screen.getByText('No alerts to display')).toBeInTheDocument();
  });




  test('handles Firebase API error gracefully', async () => {
    // Mock fetchAlertsFromFirebase to reject with an error
    fetchAlertsFromFirebase.mockRejectedValue(new Error('Firebase Error'));
  
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    render(<NotificationCenter />);
  
    // Wait for the component to handle the error
    await waitFor(() => {
      // No alerts should be displayed due to error
      expect(screen.getByText('No alerts to display')).toBeInTheDocument();
    });
  
    // Ensure the error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching alerts: ', expect.any(Error));
  
    // Restore console.error after the test
    consoleErrorSpy.mockRestore();
  });
  

  test('cleans up Firebase listener on component unmount', () => {
    const { unmount } = render(<NotificationCenter />);
    
    // Unmount the component
    unmount();

    // Ensure the listener is removed
    expect(removeFirebaseListener).toHaveBeenCalled();
  });
});
