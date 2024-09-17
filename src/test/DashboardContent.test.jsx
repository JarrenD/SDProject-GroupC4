import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import DashboardContent from '../views/components/DashboardContent';

// Mock the ExpandableCard component
jest.mock('../views/ExpandableCard', () => (props) => (
  <div>
    <h3>{props.title}</h3>
    <ul>
      {props.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, // Assign the mockNavigate function
}));

describe('DashboardContent Component', () => {
  beforeEach(() => {
    // Clear the mock before each test to avoid interference
    mockNavigate.mockClear();
  });

  test('renders the component and all cards', async () => {
    render(
      <MemoryRouter>
        <DashboardContent />
      </MemoryRouter>
    );

    // Check if the main headings are rendered
    expect(await screen.findByText(/Emergency Alert/i)).toBeInTheDocument();
    expect(await screen.findByText(/Report Incident/i)).toBeInTheDocument();
    expect(await screen.findByText(/Recent Alerts/i)).toBeInTheDocument();
    expect(await screen.findByText(/Safety Tips/i)).toBeInTheDocument();
    expect(await screen.findByText(/Campus Resources/i)).toBeInTheDocument();
    
    // Use findByRole for a specific heading
    expect(await screen.findByRole('heading', { name: /Emergency Contacts/i })).toBeInTheDocument();
});


  test('navigates to /location-sharing when "Alert Campus Security" button is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardContent />
      </MemoryRouter>
    );

    const alertButton = screen.getByText('Alert Campus Security');
    fireEvent.click(alertButton);

    expect(mockNavigate).toHaveBeenCalledWith('/location-sharing');
  });

  test('navigates to /incident-reporting when "Report Now" button is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardContent />
      </MemoryRouter>
    );

    const reportButton = screen.getByText('Report Now');
    fireEvent.click(reportButton);

    expect(mockNavigate).toHaveBeenCalledWith('/incident-reporting');
  });

  test('renders ExpandableCard with recent alerts and safety tips', async () => {
    render(
      <MemoryRouter>
        <DashboardContent />
      </MemoryRouter>
    );

    // Check for recent alerts items
    const recentAlerts = [
      "⚠️ Power outage expected in the West Campus area from 10 AM - 12 PM.",
      "⚠️ Vehicle break-in reported near the main library. Stay alert.",
      "⚠️ Water supply interruption on East Campus due to maintenance.",
      "⚠️ Protest action planned at the Great Hall at 2 PM. Avoid the area.",
      "⚠️ Suspicious package reported at the Science Stadium. Area cordoned off."
    ];

    for (const alert of recentAlerts) {
      expect(await screen.findByText(alert)).toBeInTheDocument();
    }

    // Check for safety tips items
    const safetyTips = [
      "🔒 Always lock your car doors and keep valuables out of sight.",
      "🔦 Avoid walking alone at night; use the campus escort service.",
      "🕵️‍♂️ Report any suspicious activities immediately to campus security.",
      "🚶‍♀️ Use well-lit walkways and avoid isolated areas, especially at night.",
      "📱 Keep your mobile phone with you and fully charged in case of emergencies."
    ];

    for (const tip of safetyTips) {
      expect(await screen.findByText(tip)).toBeInTheDocument();
    }
  });
});
