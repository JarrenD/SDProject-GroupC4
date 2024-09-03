import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
}

export default App;