import React, { useState } from 'react';
import { Home, LayoutDashboard, Bell, PhoneCall, Clipboard, Book, HelpCircle, Settings, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Homepage', icon: Home, href: '/dashboard' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Notifications', icon: Bell, href: '/notification-centre' },
    { name: 'Emergency Contacts', icon: PhoneCall, href: '/emergency-contacts' },
    { name: 'Incident Reports', icon: Clipboard, href: '/incident-reporting' },
    { name: 'Campus Resources', icon: Book, href: '/safety-resources' },
    { name: 'Help', icon: HelpCircle, href: '#help' },
    { name: 'Settings', icon: Settings, href: '#settings' },
    { name: 'Logout', icon: LogOut, href: '#logout' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h2>Campus Safety</h2>
        <button className="toggle-btn" onClick={toggleNavbar}>
          <Menu size={22} />
        </button>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to}>
              <item.icon className="navbar-icon" size={20} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;