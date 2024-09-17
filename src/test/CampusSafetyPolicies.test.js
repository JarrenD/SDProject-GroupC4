import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
import CampusSafetyPolicies from '../views/components/CampusSafetyPolicies';

describe('CampusSafetyPolicies Component', () => {
  beforeEach(() => {
    render(<CampusSafetyPolicies />);
  });

  test('renders the component', () => {
    const heading = screen.getByText(/Campus Safety Policies/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders Policy 1 link with correct attributes', () => {
    const policy1Link = screen.getByText(/Policy 1/i);
    expect(policy1Link).toBeInTheDocument();
    expect(policy1Link).toHaveAttribute('href', 'https://www.yourcampus.edu/policy1');
    expect(policy1Link).toHaveAttribute('target', '_blank');
    expect(policy1Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders Policy 2 link with correct attributes', () => {
    const policy2Link = screen.getByText(/Policy 2/i);
    expect(policy2Link).toBeInTheDocument();
    expect(policy2Link).toHaveAttribute('href', 'https://www.yourcampus.edu/policy2');
    expect(policy2Link).toHaveAttribute('target', '_blank');
    expect(policy2Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Add more tests as needed for additional policies
});
