// src/components/SafetyResources.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SafetyResources from '../views/pages/SafetyResources';


// Mock the imported components
jest.mock('../views/components/TopNav', () => ({ setActiveSection }) => (
  <button onClick={() => setActiveSection('campusPolicies')}>Change to Campus Policies</button>
));
jest.mock('../views/components/SafetyTips', () => () => <div>Safety Tips Content</div>);
jest.mock('../views/components/CampusSafetyPolicies', () => () => <div>Campus Safety Policies Content</div>);

describe('SafetyResources', () => {

  test('renders CampusSafetyPolicies when activeSection is changed', () => {
    render(<SafetyResources />);

    // Simulate a section change via the mocked TopNav component
    fireEvent.click(screen.getByText('Change to Campus Policies'));

    // Expect CampusSafetyPolicies content to be displayed
    expect(screen.getByText('Campus Safety Policies Content')).toBeInTheDocument();
  });
});
