import React, { useEffect, useState } from 'react';
import '../styles/SalesEvolution.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";

const SalesEvolution = () => {
  const [salesValues7, setSalesValues7] = useState('');
  const [isCanvasDisplaied, setCanvasDisplaied] = useState(false);

  useEffect(() => {
    ajax("http://localhost:5000/api/form2", "GET")
      .then((data) => {
        setSalesValues7(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  }, [])

  function showData() {

    const ctx = document.getElementById('chart');

    let dates = [];
    let values = [];


    for (let i = 0; i < salesValues7.length; i++) {
      dates.push(salesValues7[i].date_sale)
    }

    for (let i = 0; i < salesValues7.length; i++) {
      values.push(salesValues7[i].sum_price)
    }

    if (!isCanvasDisplaied) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
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
    <div className="sales-evolution">
      <h1>Evolution of the sales</h1>
      <div className="chart-container">
        <canvas id="chart"></canvas>
      </div>
      <button onClick={showData}>Show</button>
      <div className="data-table">
        {/* Table would go here */}
      </div>
      <div className="controls">
        <div className="trend-type-selector">
          {/* Dropdown to select trend type */}
        </div>
        <input type="number" placeholder="Enter number of months" />
        <button>Excel export</button>
        <button>Predict</button>
      </div>
    </div>
  );
};

export default SalesEvolution;
