import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AdminDashboardSlider.css';

const AdminDashboardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const resources = [
    {
      title: "Admin Guidelines",
      description: "Access administrative protocols and operational guidelines for Wits campus safety",
    },
    {
      title: "Emergency Protocol",
      description: "Review step-by-step emergency response procedures and protocols",
    },
    {
      title: "Training Materials",
      description: "Access training resources and documentation for safety personnel",
    },
    {
      title: "System Updates",
      description: "View latest system changes and upcoming maintenance schedules",
    },
    {
      title: "Staff Directory",
      description: "Access contact information for all safety personnel",
    },
    {
      title: "Incident Reports",
      description: "Review and manage campus security incident reports",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === resources.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? resources.length - 1 : prevIndex - 1
    );
  };

  const handleViewDetails = () => {
    // Placeholder for future functionality
    console.log(`Viewing details for: ${resources[currentIndex].title}`);
  };

  return (
    <div className="admin-dashboard">
      
      <div className="slider-container">
        <button 
          onClick={prevSlide}
          className="slider-button"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="slider-content">
          <h4>{resources[currentIndex].title}</h4>
          <p>{resources[currentIndex].description}</p>
          <button
            onClick={handleViewDetails}
            className="view-details-button"
          >
            View Details
          </button>
        </div>

        <button 
          onClick={nextSlide}
          className="slider-button"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="dots-container">
        {resources.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardSlider;