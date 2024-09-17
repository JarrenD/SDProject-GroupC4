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
    expect(screen.getByText(/safety tips/i)).toBeInTheDocument();

    // Check the presence of each safety tip
    expect(screen.getByText(/always be aware of your surroundings/i)).toBeInTheDocument();
    expect(screen.getByText(/don’t walk alone at night; use the buddy system/i)).toBeInTheDocument();
    expect(screen.getByText(/report suspicious activity immediately/i)).toBeInTheDocument();
  });
});
