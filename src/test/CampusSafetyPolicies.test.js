import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the 'toBeInTheDocument' matcher
import CampusSafetyPolicies from '../views/components/CampusSafetyPolicies'; // Adjust the import path as necessary

describe('CampusSafetyPolicies Component', () => {
  test('renders without crashing', () => {
    render(<CampusSafetyPolicies />);
    // Just rendering without crashing
  });

  test('displays policy sections correctly', () => {
    render(<CampusSafetyPolicies />);

    // Check the presence of the heading
    expect(screen.getByText(/Campus Safety Policies/i)).toBeInTheDocument();

    // Check the presence of each policy section
    expect(screen.getByText(/mySOS Campus Emergency Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Download mySOS for free and register yourself as a user/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Escort Service/i)).toBeInTheDocument();
    expect(screen.getByText(/There is a 24-hour escort service available for staff and students on campus/i)).toBeInTheDocument();
    expect(screen.getByText(/Identity Card Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Access to many University facilities is controlled by the use of your student or staff identity card/i)).toBeInTheDocument();
    expect(screen.getByText(/Misuse of Student Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Allowing another person to use your card for any purpose/i)).toBeInTheDocument();
  });
});
