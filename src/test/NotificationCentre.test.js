// src/components/NotificationCentre.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationCentre from '../views/pages/NotificationCentre';

describe('NotificationCentre', () => {
  test('renders without crashing', () => {
    render(<NotificationCentre />);
    expect(screen.getByText('Notification Centre')).toBeInTheDocument();
  });

});
