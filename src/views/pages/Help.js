import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [showiOS, setShowiOS] = useState(false);
  const [showAndroid, setShowAndroid] = useState(false);

  return (
    <div className="help-container">
      <h1>Add Campus Safety to your smartphone/tablet home screen</h1>

      <div className="dropdown">
        <button onClick={() => setShowiOS(!showiOS)} className="dropdown-btn">
          iPhone or iPad
        </button>
        {showiOS && (
          <ul className="dropdown-content">
            <li>1. Open Safari. Other browsers, such as Chrome, won't work for this</li>
            <li>2. Navigate to the Campus Safety App Dashboard</li>
            <li>3. Tap the Share button on the bottom of the page. It looks like a square with an arrow pointing out of the top</li>
            <li>4. In the list of options that appear, scroll down until you see Add to Home Screen. Tap this</li>
            <li>5. Choose a name for the website shortcut on your home screen, then click Add. Safari will close automatically and you will see the icon on your home screen</li>
            <li>6. Tap the new "app" or shortcut, and it will open the website in its own window</li>
          </ul>
        )}
      </div>

      <div className="dropdown">
        <button onClick={() => setShowAndroid(!showAndroid)} className="dropdown-btn">
          Android
        </button>
        {showAndroid && (
          <ul className="dropdown-content">
            <li>1. Open Chrome</li>
            <li>2. Navigate to the Campus Safety App Dashboard</li>
            <li>3. Tap the menu icon (3 dots in the upper right-hand corner) and tap Add to home screen</li>
            <li>4. Choose a name for the website shortcut, then Chrome will add it to your home screen</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Help;
