import React, { useState, useEffect } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to trigger a notification
export const notify = (message) => {
  if (Notification.permission === 'granted') {
    try {
      new Notification('Campus Alert', { body: message });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
  toast(message);
};

export const PushNotifications = () => {
  const [permissionState, setPermissionState] = useState('default');

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPermissionState(permission);
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          notify("Notifications have been enabled!");
        } else {
          console.log('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        setPermissionState('error');
      }
    } else {
      console.log('This browser does not support notifications.');
      setPermissionState('unsupported');
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.permission;
        setPermissionState(permission);
      } else {
        setPermissionState('unsupported');
      }
    };

    checkPermission();
  }, []);

  return (
    <>
      {permissionState === 'default' && (
        <div className="notification-banner">
          <span>Would you like to receive push notifications for important campus alerts?</span>
          <button onClick={requestNotificationPermission} className="enable-button">
            Enable Notifications
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
};
