import React, { useState } from 'react';
import { Home, Bell, Clipboard, AlertTriangle, Menu, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePath, setActivePath] = useState('/admin');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/admin-dashboard' },
    { name: 'Incident Management', icon: Clipboard, href: '/admin-incidents' },
    //{ name: 'User & Role Management', icon: Users, href: '/admin/users' },
    { name: 'Notifications', icon: Bell, href: '/admin-notifications' },
    //{ name: 'Safety Resources', icon: Book, href: '/admin/resources' },
    { name: 'Emergency Alerts', icon: AlertTriangle, href: '/admin-locations' },
  ];

  const handleClick = (href) => {
    setActivePath(href);
    // You can add navigation logic here if needed
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="admin-sidebar-header">
        {isOpen && <h2> Admin </h2>}
        <button className="admin-toggle-btn" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>
      </div>
      <nav className="admin-sidebar-content">
        <ul className="admin-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={activePath === item.href ? 'active' : ''}>
              <a href={item.href} onClick={() => handleClick(item.href)}>
                <item.icon className="admin-sidebar-icon" size={20} />
                {isOpen && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      <div className="admin-sidebar-footer">
        <a href="/logout" className="logout-link">
          <LogOut className="admin-sidebar-icon" size={20} />
          {isOpen && <span className='logout-text'>Logout</span>}
        </a>
      </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;