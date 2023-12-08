import React, { useEffect, useState } from 'react';
import '../styles/SalesEvolution.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';


const SalesEvolution = () => {
  const [isCanvasDisplaied, setCanvasDisplaied] = useState(false);
  const [predictionData, setPredictionData] = useState('');
  const [months, setMonths] = useState('');
  const [prediction, setPrediction] = useState('');
  const [salesValues7, setSalesValues7] = useState('');



  useEffect(() => {
    ajax("http://localhost:5000/api/form2", "GET")
      .then((data) => {
        setSalesValues7(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  }, [])

  function showPrediction() {
    ajax("http://localhost:5000/api/form2/prediction?months=" + months + "&predictionType=" + prediction, "GET")
      .then((data) => {
        setPredictionData(Object.entries(JSON.parse(data.message)))
      }).catch(e => {
        console.log(e);
      });
  }


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

  const exportDataWithJsExcel = async () => {
    const fileName = "Sales_evolution_prediction"
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(predictionData);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }


  return (
    <div className="sales-evolution">
      <h1>Evolution of the sales</h1>
      <div className="chart-container">
        <canvas id="chart"></canvas>
      </div>
      <div className="chart-container">
        {predictionData ?
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sales Value</th>
              </tr>
            </thead>
            <tbody>
              {predictionData.map(([date, salesValue], index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{salesValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
          : ''}

      </div>
      <button onClick={showData}>Show</button>
      <div className="data-table">
        {/* Table would go here */}
      </div>
      <div className="controls">
        <div className="trend-type-selector">
          {/* Dropdown to select trend type */}
        </div>

        <input type="number" placeholder="Enter number of months" onChange={(event) => { setMonths(event.target.value) }} />

        <label htmlFor="prediction-select">Select the prediction:</label>
        <select id="prediction-select" name="prediction" onChange={(event) => { setPrediction(event.target.value) }}>
          <option>--Please choose an option--</option>
          <option value="1">Logarithmic</option>
          <option value="2">Linear</option>
          <option value="3">Polinomial</option>
          <option value="4">Power</option>
          <option value="5">Exponential</option>
        </select>

        <button onClick={exportDataWithJsExcel}>Excel export</button>
        <button onClick={showPrediction}>Predict</button>

      </div>
    </div>
  );
};

export default SalesEvolution;
