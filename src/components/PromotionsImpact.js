import React, { useState } from 'react';
import '../styles/PromotionsImpact.css';

const PromotionsImpact = () => {
  const [year, setYear] = useState('');
  const [predictedValue, setPredictedValue] = useState('');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handlePredictClick = () => {
    // You would replace this with actual prediction logic
    setPredictedValue('Prediction Result');
  };

  return (
    <div className="promotion-impact-container">
      <div className="header">
        <h2>Discounts</h2>
      </div>
      <div className="content">
        <div className="chart-container">
          {/* Chart rendering element (like a canvas or SVG) */}
        </div>
        <div className="controls-container">
          <button className="show-button">Show</button>
        </div>
        <div className="data-container">
          <div className="input-group">
            <label htmlFor="year-input">Enter a year:</label>
            <input
              type="text"
              id="year-input"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="predicted-value">Predicted value:</label>
            <input
              type="text"
              id="predicted-value"
              value={predictedValue}
              disabled
            />
          </div>
          <button className="predict-button" onClick={handlePredictClick}>
            Predict
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionsImpact;
