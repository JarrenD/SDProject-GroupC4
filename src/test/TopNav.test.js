import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopNav from '../views/components/TopNav';
import '@testing-library/jest-dom';


describe('TopNav Component', () => {
  test('renders topnav buttons', () => {
    // Mock function for setActiveSection
    const mockSetActiveSection = jest.fn();

    // Render the TopNav component
    render(<TopNav setActiveSection={mockSetActiveSection} />);

    // Check if the buttons are rendered with correct text
    expect(screen.getByText('Safety Tips')).toBeInTheDocument();
    expect(screen.getByText('Campus Safety Policies')).toBeInTheDocument();
  });

  test('button click triggers setActiveSection with correct argument', () => {
    // Mock function for setActiveSection
    const mockSetActiveSection = jest.fn();

    // Render the TopNav component
    render(<TopNav setActiveSection={mockSetActiveSection} />);

    // Click the Safety Tips button
    fireEvent.click(screen.getByText('Safety Tips'));
    expect(mockSetActiveSection).toHaveBeenCalledWith('safetyTips');

    // Click the Campus Safety Policies button
    fireEvent.click(screen.getByText('Campus Safety Policies'));
    expect(mockSetActiveSection).toHaveBeenCalledWith('campusPolicies');
  });
});
