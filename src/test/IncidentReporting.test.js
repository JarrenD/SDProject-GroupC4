import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IncidentReporting from '../views/pages/IncidentReporting';


describe('IncidentReporting Component', () => {
  test('renders without crashing', () => {
    render(<IncidentReporting />);
    // Check if the component is rendered
    expect(screen.getByText('Incident Reporting')).toBeInTheDocument();
  });

  test('displays the heading text correctly', () => {
    render(<IncidentReporting />);
    // Check if the heading text is present
    const headingElement = screen.getByText('Incident Reporting');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1'); // Ensure it is an h1 element
  });

  test('has correct styles applied', () => {
    render(<IncidentReporting />);
    const containerElement = screen.getByText('Incident Reporting').parentElement;
    expect(containerElement).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    });
  });
});
