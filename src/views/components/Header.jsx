import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const Header = () => {
  const [userName, setUserName] = useState('User');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, 'user/' + user.uid);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.displayName) {
            setUserName(userData.displayName);
          }
        });
      }
    });

    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good afternoon');
      } else if (currentHour >= 18 && currentHour < 22) {
        setGreeting('Good evening');
      } else {
        setGreeting('Good night');
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);

    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="header">
      <h1>{greeting}, {userName}</h1>
      <p>Welcome to Campus Safety. Your safety is our priority. Stay informed and protected.</p>
    </header>
  );
};

export default Header;