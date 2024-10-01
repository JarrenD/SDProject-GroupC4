import React from 'react';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const CampusSafetyFooter = () => {
  return (
    <footer className="campus-safety-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h2 className='wits-h2'>WITS</h2>
            <h3>Campus Safety</h3>
            <p>1 Jan Smuts Avenue</p>
            <p>Braamfontein 2000</p>
            <p>Johannesburg, South Africa</p>
            <p>011 717 4444</p>
            <div className="social-icons">
              <Twitter size={24} />
              <Instagram size={24} />
              <Facebook size={24} />
              <Youtube size={24} />
            </div>
            <button className="admin-login">Admin Login</button>
          </div>
          <div className="footer-column">
            <h4>Departments</h4>
            <ul>
              <li>Police</li>
              <li>Security Services</li>
              <li>Emergency Management</li>
              <li>Fire Safety</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li>How to Report</li>
              <li>Safety Tips</li>
              <li>Bus Schedule</li>
              <li>Night Shuttle</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Additional Info</h4>
            <ul>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 The University of Witwatersrand</p>
          <div className="footer-links">
            <button className="footer-link">WITS Policy</button>
            <button className="footer-link">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CampusSafetyFooter;