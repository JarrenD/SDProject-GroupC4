import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../views/components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the Lucide icons to avoid issues with unrecognized SVG components in tests
jest.mock('lucide-react', () => ({
  Home: () => <div>Home Icon</div>,
  LayoutDashboard: () => <div>Dashboard Icon</div>,
  Bell: () => <div>Bell Icon</div>,
  PhoneCall: () => <div>Phone Call Icon</div>,
  Clipboard: () => <div>Clipboard Icon</div>,
  Book: () => <div>Book Icon</div>,
  HelpCircle: () => <div>Help Icon</div>,
  Settings: () => <div>Settings Icon</div>,
  LogOut: () => <div>Logout Icon</div>,
  Menu: () => <div>Menu Icon</div>,
}));

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check if Navbar header is present
    expect(screen.getByText(/Campus Safety/i)).toBeInTheDocument();

    // Check if menu items are present
    const menuItems = [
      'Homepage', 'Dashboard', 'Notifications', 'Emergency Contacts', 
      'Incident Reports', 'Campus Resources', 'Help', 'Settings', 'Logout'
    ];

    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('toggle button opens and closes the menu', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Initially, the menu should be closed
    expect(screen.queryByRole('list')).toHaveClass('navbar-menu');

    // Click the toggle button to open the menu
    fireEvent.click(screen.getByRole('button', { name: /Menu Icon/i }));
    expect(screen.queryByRole('list')).toHaveClass('navbar-menu open');

    // Click the toggle button again to close the menu
    fireEvent.click(screen.getByRole('button', { name: /Menu Icon/i }));
    expect(screen.queryByRole('list')).not.toHaveClass('navbar-menu open');
  });
});
