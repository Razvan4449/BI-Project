import React from 'react';
import '../styles/HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
    <div className="home-content">
        <h1 className="home-title">Music Store Decision Support System</h1>
        <p>Welcome and discover insights that tune into success.</p>
        <div className="pie-chart-container">
          <div className="pie-chart">
            <div className="pie-slice"></div>
          </div>
        </div>
      </div>
      <div className="equalizer-container">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`bar-${index}`} className={`bar bar-${index + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
