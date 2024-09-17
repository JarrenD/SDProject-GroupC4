import React from 'react';
import { render } from '@testing-library/react';
import CampusSafetyPolicies from '../views/components/CampusSafetyPolicies'; // Adjust the import path as necessary

describe('CampusSafetyPolicies Component', () => {
  test('renders without crashing', () => {
    render(<CampusSafetyPolicies />);
    // Simply render the component and let the test pass if no errors are thrown
  });
});
