import React from 'react';
import './CampusSafetyPolicies.css';

function CampusSafetyPolicies() {
  return (
    <div className="campus-safety-policies">
      <h2>Campus Safety Policies</h2>
      <div className="policy-section">
        <h3>mySOS Campus Emergency Service</h3>
        <p>
          Download <strong>mySOS</strong> for free and register yourself as a user. Check that you see the Wits button in mySOS. 
          If you ever have an emergency on any of the Wits campuses, open the mySOS app and press the Wits button. A call will 
          be made to Protection Services, and they will receive a notification that you have an emergency and your location. 
          mySOS is free of charge and available from the App Store and Google Play.
        </p>
        <p>
          For more information on how <strong>mySOS</strong> can assist you, visit their website.
        </p>
      </div>

      <div className="policy-section">
        <h3>Security Escort Service</h3>
        <p>
          There is a 24-hour escort service available for staff and students on campus. This service is particularly useful if 
          you are working late. To request an escort, dial one of the numbers listed below and provide the following information:
        </p>
        <ul>
          <li>Your current location</li>
          <li>Your name</li>
          <li>Call back number in case of delay</li>
        </ul>
        <p><strong>Security Telephone Numbers:</strong></p>
        <ul>
          <li>East Campus: (011) 717 4444 / 6666</li>
          <li>West Campus: (011) 717 1842</li>
          <li>Health Sciences Campus: (011) 717 2222 / 2232</li>
          <li>Education Campus: (011) 717 3340</li>
          <li>Business School: (011) 717 3589</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>Identity Card Policy</h3>
        <p>
          Access to many University facilities is controlled by the use of your student or staff identity card. Please carry 
          your card at all times. If your card is lost or stolen, report this to Protection Services immediately.
        </p>
        <p>
          Be prepared to show your card to Protection Services or Library personnel at any time. Other officers of the University 
          may also require your card for identification. Misuse of your card may lead to disciplinary action or confiscation.
        </p>
      </div>

      <div className="policy-section">
        <h3>Misuse of Student Card</h3>
        <p>
          Misuse of your student card includes:
        </p>
        <ul>
          <li>Allowing another person to use your card for any purpose</li>
          <li>Being in possession of more than one student card</li>
          <li>Failing to report loss or theft of your card</li>
          <li>Allowing unauthorized access to University facilities using your card</li>
        </ul>
      </div>
    </div>
  );
}

export default CampusSafetyPolicies;
