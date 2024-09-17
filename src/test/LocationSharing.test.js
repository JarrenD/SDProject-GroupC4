import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationSharing from '../views/pages/LocationSharing';

describe('LocationSharing Component', () => {
  test('renders without crashing', () => {
    render(<LocationSharing />);
    // Check if the component is rendered
    expect(screen.getByText('Location Sharing')).toBeInTheDocument();
  });

  test('displays the heading text correctly', () => {
    render(<LocationSharing />);
    // Check if the heading text is present
    const headingElement = screen.getByText('Location Sharing');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1'); // Ensure it is an h1 element
  });

  test('has correct styles applied', () => {
    render(<LocationSharing />);
    const containerElement = screen.getByText('Location Sharing').parentElement;
    expect(containerElement).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    });
  });
});
