import React, { useEffect, useState } from 'react';
import '../styles/SupplyManagement.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";

// Main component for the Supply Management layout
function SupplyManagement() {
  const [salesValues1, setSalesValues1] = useState('');

  useEffect(() => {
    ajax("http://localhost:5000/api/form3?mediaType=MPEG_audio_file", "GET")
      .then((data) => {
        setSalesValues1(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  })

  function showData1() {
    const ctx = document.getElementById('chart1');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues1.length; i++) {
      years.push(salesValues1[i].order_year)
    }

    for (let i = 0; i < salesValues1.length; i++) {
      values.push(salesValues1[i].count_type)
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: '# of sales',
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
  }

  return (
    <div className="supply-management">
      <div className="header">Supply</div>
      <div className="content">
        {/* Product blocks */}
        <div className="product-block">
          <div className="product cd">
            <canvas id="chart1"></canvas>
          </div>
          <button onClick={showData1}>Show MPEG audio file</button>
        </div>
        <div className="product-block">
          <div className="product dvd" />
          <button>Show Protected AAC audio file</button>
        </div>
        <div className="product-block">
          <div className="product cassette" />
          <button>Show Protected MPEG-4 video file</button>
        </div>
        <div className="product-block">
          <div className="product cassette" />
          <button>Show Purchased AAC audio file</button>
        </div>
        <div className="product-block">
          <div className="product cassette" />
          <button>Show AAC audio file</button>
        </div>
      </div>
      <div className="footer">
        <div className="form">
          <label htmlFor="mediaType">Choose the media type:</label>
          <select id="mediaType">
            <option value="cd">CD</option>
            <option value="dvd">DVD</option>
            <option value="cassette">Cassette</option>
          </select>
          <label htmlFor="year">Enter year:</label>
          <input type="text" id="year" />
          <button>Predict</button>
          <label htmlFor="predictedCount">Predicted count:</label>
          <input type="text" id="predictedCount" disabled />
        </div>
      </div>
    </div>
  );
}

export default SupplyManagement;
