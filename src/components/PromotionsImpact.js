import React, { useEffect, useState } from 'react';
import '../styles/PromotionsImpact.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";

const PromotionsImpact = () => {
  const [year, setYear] = useState('');
  const [predictedValue, setPredictedValue] = useState('');
  const [salesValues, setSalesValues] = useState('');
  const [isCanvasDisplaied, setCanvasDisplaied] = useState('');

  useEffect(() => {
    ajax("http://localhost:5000/api/form4", "GET")
      .then((data) => {
        setSalesValues(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  })

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handlePredictClick = () => {
    // You would replace this with actual prediction logic
    setPredictedValue('Prediction Result');
  };

  function showData() {


    const ctx = document.getElementById('chart');

    let years = [];
    let values = [];


    for (let i = 0; i < salesValues.length; i++) {
      years.push(salesValues[i].order_year)
    }

    for (let i = 0; i < salesValues.length; i++) {
      values.push(salesValues[i].count_disc)
    }

    // console.log(years);
    // console.log(values);
    // console.log(salesValues);
    if (!isCanvasDisplaied) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            label: '# of Sales',
            data: values,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setCanvasDisplaied(true)
    }

  }

  return (
    <div className="promotion-impact-container">
      <div className="header">
        <h2>Discounts</h2>
      </div>
      <div className="content">
        <div className="chart-container">
          <canvas id="chart"></canvas>
        </div>
        <div className="controls-container">
          <button className="show-button" onClick={showData}>Show</button>
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
