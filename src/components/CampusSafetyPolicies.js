import React from 'react';
import './CampusSafetyPolicies.css';

function CampusSafetyPolicies() {
  return (
    <div className="campus-safety-policies">
      <h2>Campus Safety Policies</h2>
      <ul>
        <li><a href="https://www.yourcampus.edu/policy1" target="_blank" rel="noopener noreferrer">Policy 1</a></li>
        <li><a href="https://www.yourcampus.edu/policy2" target="_blank" rel="noopener noreferrer">Policy 2</a></li>
        {/* Add more policies as needed */}
      </ul>
    </div>
  );
}

export default CampusSafetyPolicies;
