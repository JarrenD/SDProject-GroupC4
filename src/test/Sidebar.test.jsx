import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../views/components/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  test('renders sidebar elements', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check if the sidebar header is present
    expect(screen.getByText('Campus Safety')).toBeInTheDocument();

    // Check if the toggle button is present
    expect(screen.getByRole('button')).toBeInTheDocument();
  });


  test('sidebar toggle functionality', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check initial state of the sidebar
    expect(screen.getByText('Campus Safety')).toBeInTheDocument();
    
    // Click the toggle button
    fireEvent.click(screen.getByRole('button'));
    
    // Check if the sidebar header is no longer present (closed state)
    expect(screen.queryByText('Campus Safety')).not.toBeInTheDocument();
  });
});
