import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push } from "firebase/database";
import React, { useState, useEffect } from 'react';
import './notifications.css';

const firebaseConfig = {
  apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
  authDomain: "creativetutorial-ba1bf.firebaseapp.com",
  databaseURL: "https://creativetutorial-ba1bf-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-ba1bf",
  storageBucket: "creativetutorial-ba1bf",
  messagingSenderId: "945665449612",
  appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [announcements, setAnnouncements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [routes, setRoutes] = useState([]); // New state for routes

 

  const fetchRoutes = async () => {
    try {
      const response = await fetch('https://virtserver.swaggerhub.com/WendyMaboa/GPSTracking/1.0.0/routes', {
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Fetched route data:', data);
      
      const transformedRoutes = data.map((route, index) => ({
        id: route.id === 'string' ? `route-${index + 1}` : route.id,
        name: route.name === 'string' ? `Route ${index + 1}` : route.name,
        coordinates: route.coordinates
      }));

      setRoutes(transformedRoutes); // Set routes in state
      return transformedRoutes;
    } catch (error) {
      console.error("Error fetching routes: ", error);
      return [];
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCRScbysptD1nDAefqm4U6Goz8Uc88Z-iQ`  
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Get the formatted address from the first result
        return data.results[0].formatted_address;
      }
      return 'Location not found';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Error getting location';
    }
  };

  

// Internal coordinate display component
const RouteCoordinateDisplay = ({ coord, index }) => {
  const [address, setAddress] = useState('Loading address...');

  useEffect(() => {
    const fetchAddress = async () => {
      const result = await getAddressFromCoordinates(coord.latitude, coord.longitude);
      setAddress(result);
    };
    fetchAddress();
  }, [coord.latitude, coord.longitude]);

  return (
    <li key={index} className="coordinate-item">
      <div className="address">{address}</div>
      <div className="coordinates-small">
        <small>({coord.latitude}, {coord.longitude})</small>
      </div>
    </li>
  );
};

  const pushRouteNotification = async (route) => {
    const notificationRef = ref(db, 'notifications');
    const routeName = route.name && typeof route.name === 'string' ? route.name : `Route ${route.id}`;
    const newNotification = {
      message: `New route available: ${routeName}`,
      createdAt: Date.now(),
      recipientType: 'route',
      title: 'Route Update'
    };
    await push(notificationRef, newNotification);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementsSnapshot, alertsSnapshot, notificationsSnapshot] = await Promise.all([
          get(ref(db, 'announcements')),
          get(ref(db, 'Incident_Alerts')),
          get(ref(db, 'notifications'))
        ]);

        setAnnouncements(announcementsSnapshot.exists() ? Object.values(announcementsSnapshot.val()) : []);
        setAlerts(alertsSnapshot.exists() ? Object.values(alertsSnapshot.val()) : []);
        
        const notificationsData = notificationsSnapshot.exists() ? notificationsSnapshot.val() : {};
        const notificationsArray = notificationsData ? Object.entries(notificationsData).map(([key, value]) => ({
          id: key,
          ...value,
        })) : [];
        setNotifications(notificationsArray);

        const routes = await fetchRoutes();
        for (const route of routes) {
          const existingNotifications = notificationsArray.some(
            (notification) => notification.message.includes(route.name) || notification.message.includes(route.id)
          );

          if (!existingNotifications) {
            await pushRouteNotification(route);
          } else {
            console.log(`Notification for this route ${route.name} (ID: ${route.id}) already exists.`);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []); 
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const generalNotifications = notifications.filter(
    notification => notification.recipientType === 'all'
  );

  const routeNotifications = notifications.filter(
    notification => notification.recipientType === 'route'
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notifications</h1>
        <h2>NOTIFICATION CENTER</h2>
      </header>
      <div className="main-container">
        <div className="welcome-section">
          <div className="notification-buttons">
            <button
              className={`tab ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => handleTabClick('inbox')}
            >
              Inbox
            </button>
            <button
              className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => handleTabClick('announcements')}
            >
              Announcements
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'inbox' && (
              <>
                <h3>Available Routes</h3>
                {routes.length === 0 ? (
                  <p>No routes available</p>
                ) : (
                  routes.map(route => (
                    <div key={route.id} className="inbox-message">
                      <strong>{route.name}</strong>
                      <p>Route ID: {route.id}</p>
                      <div>
                        <p>Coordinates:</p>
                        <ul>
                          {route.coordinates.map((coord, index) => (
                            <RouteCoordinateDisplay key={index} coord={coord} index={index} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}

                <h3>Route Updates</h3>
                {routeNotifications.length === 0 ? (
                  <p>No route updates</p>
                ) : (
                  routeNotifications.map(notification => (
                    <div key={notification.id} className="inbox-message">
                      <strong>{notification.title}</strong>
                      <p>{notification.message}</p>
                      {notification.createdAt && (
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                      )}
                    </div>
                  ))
                )}

                <h3>Incidents</h3>
                {alerts.length === 0 ? (
                  <p>No incidents</p>
                ) : (
                  alerts.map((alert, index) => (
                    <div key={index} className="inbox-message">
                      <strong>{alert.title}</strong>
                      <p>{alert.description}</p>
                      {alert.timestamp && (
                        <small>{new Date(alert.timestamp).toLocaleString()}</small>
                      )}
                    </div>
                  ))
                )}

                <h3>General Notifications</h3>
                {generalNotifications.length === 0 ? (
                  <p>No general notifications</p>
                ) : (
                  generalNotifications.map(notification => (
                    <div key={notification.id} className="inbox-message">
                      <strong>{notification.title}</strong>
                      <p>{notification.message}</p>
                      {notification.createdAt && (
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === 'announcements' && (
              <>
                {announcements.length === 0 ? (
                  <p>No announcements available</p>
                ) : (
                  announcements.map((announcement, index) => (
                    <div key={index} className="announcement">
                      <strong>Announcement</strong>
                      <p>{announcement.message}</p>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        <div className="notifications-panel">
          <h3>Latest Alert</h3>
          {alerts.length === 0 ? (
            <p>No alerts</p>
          ) : (
            <div className="real-time-notification">
              <div className="notification-alert">
                <strong>{alerts[alerts.length - 1].title}</strong>
                <p>{alerts[alerts.length - 1].description}</p>
                {alerts[alerts.length - 1].timestamp && (
                  <small>{new Date(alerts[alerts.length - 1].timestamp).toLocaleString()}</small>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;