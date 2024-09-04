import React, { useState } from 'react';
import { Home, LayoutDashboard, Bell, PhoneCall, Clipboard, Book, HelpCircle, Settings, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Homepage', icon: Home, href: '#homepage' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
    { name: 'Notifications', icon: Bell, href: '#notifications' },
    { name: 'Emergency Contacts', icon: PhoneCall, href: '#emergency-contacts' },
    { name: 'Incident Reports', icon: Clipboard, href: '#incident-reports' },
    { name: 'Campus Resources', icon: Book, href: '#campus-resources' },
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
            <a href={item.href}>
              <item.icon className="navbar-icon" size={20} />
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;