import React from 'react';
import './SafetyTips.css';

function SafetyTips() {
  return (
    <div className="safety-tips">
      <h2>Safety Tips</h2>
      <ul>
        <li>Always be aware of your surroundings.</li>
        <li>Don’t walk alone at night; use the buddy system.</li>
        <li>Report suspicious activity immediately.</li>
        {/* Add more tips as needed */}
      </ul>
    </div>
  );
}

export default SafetyTips;
