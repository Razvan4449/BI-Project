import React, { useEffect, useState } from 'react';
import '../styles/SupplyManagement.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";

// Main component for the Supply Management layout
function SupplyManagement() {
  const [salesValues1, setSalesValues1] = useState('');
  const [salesValues2, setSalesValues2] = useState('');
  const [salesValues3, setSalesValues3] = useState('');
  const [salesValues4, setSalesValues4] = useState('');
  const [salesValues5, setSalesValues5] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [year, setYear] = useState('')
  const [predictedValue, setPredictedValue] = useState('')

  useEffect(() => {
    ajax("http://localhost:5000/api/form3?mediaType=MPEG_audio_file", "GET")
      .then((data) => {
        setSalesValues1(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });

    ajax("http://localhost:5000/api/form3?mediaType=Show_Protected_AAC_audio_file", "GET")
      .then((data) => {
        setSalesValues2(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });

    ajax("http://localhost:5000/api/form3?mediaType=Protected_MPEG-4_video_file", "GET")
      .then((data) => {
        setSalesValues3(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });

    ajax("http://localhost:5000/api/form3?mediaType=Purchased_AAC_audio_file", "GET")
      .then((data) => {
        setSalesValues4(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });

    ajax("http://localhost:5000/api/form3?mediaType=AAC_audio_file", "GET")
      .then((data) => {
        setSalesValues5(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  }, [])

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

  function showData2() {

    const ctx = document.getElementById('chart2');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues2.length; i++) {
      years.push(salesValues2[i].order_year)
    }

    for (let i = 0; i < salesValues2.length; i++) {
      values.push(salesValues2[i].count_type)
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

  function showData3() {

    const ctx = document.getElementById('chart3');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues3.length; i++) {
      years.push(salesValues3[i].order_year)
    }

    for (let i = 0; i < salesValues3.length; i++) {
      values.push(salesValues3[i].count_type)
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

  function showData4() {

    const ctx = document.getElementById('chart4');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues4.length; i++) {
      years.push(salesValues4[i].order_year)
    }

    for (let i = 0; i < salesValues4.length; i++) {
      values.push(salesValues4[i].count_type)
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

  function showData5() {

    const ctx = document.getElementById('chart5');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues5.length; i++) {
      years.push(salesValues5[i].order_year)
    }

    for (let i = 0; i < salesValues5.length; i++) {
      values.push(salesValues5[i].count_type)
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

  function showPredict() {
    ajax("http://localhost:5000/api/form3/prediction?mediaType=" + mediaType + "&year=" + year, "GET")
      .then((data) => {
        setPredictedValue(data.message)
      }).catch(e => {
        console.log(e);
      });
  }


  return (
    <div className="supply-management">
      <div className="header">Supply</div>
      <div className="content">
        {/* Product blocks */}
        <div className="product-block">
          <div className="product mpeg">
            <canvas id="chart1"></canvas>
          </div>
          <button onClick={showData1}>Show MPEG audio file</button>
        </div>
        <div className="product-block">
          <div className="product dvd">
            <canvas id="chart2"></canvas>
          </div>
          <button onClick={showData2}>Show Protected AAC audio file</button>
        </div>
        <div className="product-block">
          <div className="product cassette">
            <canvas id="chart3"></canvas>
          </div>
          <button onClick={showData3}>Show Protected MPEG-4 video file</button>
        </div>
        <div className="product-block">
          <div className="product cassette">
            <canvas id="chart4"></canvas>
          </div>
          <button onClick={showData4}>Show Purchased AAC audio file</button>
        </div>
        <div className="product-block">
          <div className="product cassette">
            <canvas id="chart5"></canvas>
          </div>
          <button onClick={showData5}>Show AAC audio file</button>
        </div>
      </div>
      <div className="footer">
        <div className="form">
          <label htmlFor="mediaType">Choose the media type:</label>
          <select id="mediaType" onChange={(event) => { setMediaType(event.target.value) }}>
            <option>--Please choose an option--</option>
            <option value="MPEG_audio_file">MPEG_audio_file</option>
            <option value="Show_Protected_AAC_audio_file">Show Protected AAC audio file</option>
            <option value="Protected_MPEG-4_video_file">Protected MPEG-4 video file</option>
            <option value="Purchased_AAC_audio_file-4_video_file">Purchased AAC audio file</option>
            <option value="AAC_audio_file">AAC audio file</option>
          </select>
          <label htmlFor="year">Enter year:</label>
          <input type="text" id="year" onChange={(event) => { setYear(event.target.value) }} />
          <button onClick={showPredict}>Predict</button>
          <label htmlFor="predictedCount">Predicted count:</label>
          <input type="text" id="predictedCount" value={predictedValue} disabled />
        </div>
      </div>
    </div>
  );
}

export default SupplyManagement;
