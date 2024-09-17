import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the 'toBeInTheDocument' matcher
import SafetyTips from '../views/components/SafetyTips'; // Adjust the import path as necessary

describe('SafetyTips Component', () => {
  test('renders without crashing', () => {
    render(<SafetyTips />);
    // Just rendering without crashing
  });

  test('displays safety tips correctly', () => {
    render(<SafetyTips />);

    // Check the presence of the heading
    expect(screen.getByText(/advice to keep your home safe/i)).toBeInTheDocument();

    // Check the presence of specific tips
    expect(screen.getByText(/arrange with your neighbours to take out the postal mail/i)).toBeInTheDocument();
    expect(screen.getByText(/make sure you have good lighting/i)).toBeInTheDocument();
    expect(screen.getByText(/don’t let too many people know when you are going on holiday/i)).toBeInTheDocument();
    expect(screen.getByText(/make sure your doors lock properly/i)).toBeInTheDocument();
    expect(screen.getByText(/notify the police and armed response company/i)).toBeInTheDocument();
  });
});
