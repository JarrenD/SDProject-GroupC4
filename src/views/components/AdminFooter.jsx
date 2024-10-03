import React from 'react';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h2 className="wits-h2">WITS</h2>
            <h3>Campus Safety Admin</h3>
            <p>1 Jan Smuts Avenue</p>
            <p>Braamfontein 2000</p>
            <p>Johannesburg, South Africa</p>
            <p>Admin Hotline: 011 717 5555</p>
            <div className="social-icons">
              <Twitter size={20} />
              <Instagram size={20} />
              <Facebook size={20} />
              <Youtube size={20} />
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>Incident Management</li>
              <li>Emergency Alerts</li>
              <li>User Role Management</li>
              <li>Analytics Dashboard</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li>Admin Guidelines</li>
              <li>Emergency Protocols</li>
              <li>Training Materials</li>
              <li>System Updates</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>IT Help Desk</li>
              <li>Report an Issue</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 The University of Witwatersrand - Campus Safety Administration</p>
          <div className="footer-links">
            <button className="footer-link">Admin Policy</button>
            <button className="footer-link">Terms of Use</button>
            <button className="footer-link">Privacy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;