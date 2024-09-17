import React, { useState } from 'react';
import { Home, LayoutDashboard, Bell, PhoneCall, Clipboard, Book, HelpCircle, Settings, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Homepage', icon: Home, href: '/dashboard' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Notifications', icon: Bell, href: '/notification-centre' },
    { name: 'Incident Reports', icon: Clipboard, href: '/incident-reporting' },
    { name: 'Emergency Contacts', icon: PhoneCall, href: '/emergency-contacts' },
    { name: 'Campus Resources', icon: Book, href: '/safety-resources' },
    { name: 'Settings', icon: Settings, href: '#settings' },
    { name: 'Logout', icon: LogOut, href: '#logout' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen && <h2>Campus Safety</h2>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.href}>
              <item.icon className="sidebar-icon" size={20} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
