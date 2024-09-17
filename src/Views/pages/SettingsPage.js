import React, { useState } from 'react';
import { Save } from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', { notifications, darkMode, fontSize });
    // success message
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="setting-group">
          <label htmlFor="notifications">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        <div className="setting-group">
          <label htmlFor="darkMode">
            <input
              type="checkbox"
              id="darkMode"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Dark Mode
          </label>
        </div>
        <div className="setting-group">
          <label htmlFor="fontSize">Font Size</label>
          <select
            id="fontSize"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button type="submit" className="save-button">
          <Save size={20} />
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;