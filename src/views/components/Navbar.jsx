import React from 'react';
import { Home, Bell, Clipboard, PhoneCall, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {/* Home */}
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <Home size={22} />
            <span>Home</span>
          </Link>
        </li>

        {/* Notifications */}
        <li className="nav-item">
          <Link to="/notification-centre" className="nav-link">
            <Bell size={22} />
            <span>Notifications</span>
          </Link>
        </li>

        {/* Incident Reports */}
        <li className="nav-item">
          <Link to="/incident-reporting" className="nav-link">
            <Clipboard size={22} />
            <span>Incident Reports</span>
          </Link>
        </li>

        {/* Emergency Contacts */}
        <li className="nav-item">
          <Link to="/emergency-contacts" className="nav-link">
            <PhoneCall size={22} />
            <span>Emergency Contacts</span>
          </Link>
        </li>

        {/* Campus Resources */}
        <li className="nav-item">
          <Link to="/safety-resources" className="nav-link">
            <Book size={22} />
            <span>Campus Resources</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;