import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SafetyResourcesSlider.css';

const SafetyResourcesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const resources = [
    {
      title: "Campus Safety Tips",
      description: "Essential tips and guidelines for staying safe on campus",
      route: "/safety-tips"
    },
    {
      title: "Safety Policies",
      description: "View detailed campus safety policies and procedures",
      route: "/safety-policies"
    },
    {
      title: "Bus Schedules",
      description: "Check campus bus routes and timings",
      route: "/bus-schedules"
    },
    {
      title: "Night Shuttle Service",
      description: "View night shuttle schedules and request rides",
      route: "/night-shuttle"
    },
    {
      title: "Recent Alerts",
      description: "View recent safety alerts and notifications",
      route: "/notification-centre"
    },
    {
      title: "Emergency Contacts",
      description: "View your emergency contacts",
      route: "/emergency-contacts"
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

  return (
    <div className="safety-resources">
      <h3>Safety Resources</h3>
      
      <div className="slider-container">
        <button 
          onClick={prevSlide}
          className="slider-button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="slider-content">
          <h4>{resources[currentIndex].title}</h4>
          <p>{resources[currentIndex].description}</p>
          <button
            onClick={() => navigate(resources[currentIndex].route)}
            className="view-details-button"
          >
            View Details
          </button>
        </div>

        <button 
          onClick={nextSlide}
          className="slider-button"
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

export default SafetyResourcesSlider;