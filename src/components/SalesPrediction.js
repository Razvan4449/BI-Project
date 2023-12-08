import React, { useRef, useState } from 'react';
import '../styles/SalesPrediction.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

function SalesPrediction() {
  const genres = ['Rock', 'Pop', 'Jazz', 'HipHop', 'R&B'];
  const [sales, setSales] = useState([]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [predictionData, setPredictionData] = useState('');
  const [prediction, setPrediction] = useState('');
  const [year, setYear] = useState ('');
  const [genreSelect, setGenreSelect] = useState('');



  const handleGenreChange = (event) => {
    // Implement genre change handling if needed
  };

  const handleYearInput = (event) => {
    // Implement year input handling if needed
  };

  const handlePredict = () => {
    // Implement prediction action if needed
  };
  function showPrediction() {
    const genreIDs = {
      'Rock': 1,
      'Pop': 9,
      'Jazz': 2,
      'HipHop': 17,
      'R&B': 14
    };
    const genreID = genreIDs[genreSelect];

    ajax(`http://localhost:5000/api/form1/prediction?genreId=${genreID}&year=` + year, "GET")
    .then((data) => {
      setPredictionData(data.message);
    }).catch(e => {
      console.log(e);
    });
}

  const displayChart = (genre) => {
    const genreIDs = {
      'Rock': 1,
      'Pop': 9,
      'Jazz': 2,
      'HipHop': 17,
      'R&B': 14
    };
    const genreID = genreIDs[genre];

    ajax(`http://localhost:5000/api/form1?genreId=${genreID}`, "GET")
      .then((data) => {
        const newSales = JSON.parse(data.message);
        setSales(newSales);

        const dates = newSales.map(sale => sale.order_year.toString());
        const values = newSales.map(sale => sale.avg_sales);

        if (chartRef.current && !chartInstance) {
          const newChart = new Chart(chartRef.current.getContext('2d'), {
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
          setChartInstance(newChart);
        } else if (chartInstance) {
          chartInstance.data.labels = dates;
          chartInstance.data.datasets[0].data = values;
          chartInstance.update();
        }
      }).catch(e => {
        console.error(e);
      });
  };

  // Render table rows from sales data
  const renderTableRows = () => {
    return sales.map((sale, index) => (
      <tr key={index}>
        <td>{sale.order_year}</td>
        <td>{sale.avg_sales}</td>
      </tr>
    ));
  };

  const exportDataWithJsExcel = async () => {
    const fileName = "Sales_of_events_prediction"
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(sales);

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }


  return (
    <div className="sales-prediction-container">
      <div className="chart-and-controls">
        <div className="chart-container">
          <canvas ref={chartRef} id="chart"></canvas>
        </div>
        <div className="controls-container">
          {genres.map((genre) => (
            <button key={genre} onClick={() => displayChart(genre)}>
              Show {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="input-and-predict">
        <div className="input-container">
          <select onChange={(event) =>{
            setGenreSelect(event.target.value);
          }}>
            <option value="">Choose genre:</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <input type="number" placeholder="Enter a year:" onChange={(event)=>{
            setYear(event.target.value);

          }} />
        </div>
        <button onClick={showPrediction}>Predict</button>
      </div>
      <div className="data-display">
        {sales.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Average Sales</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        ) : (
          <p>No sales data to display.</p>
        )}

        <div className="input-group">
            <label htmlFor="predicted-value">Predicted value:</label>
            <input
              type="text"
              id="predicted-value"
              value={predictionData}
              disabled
            />
        </div>
      </div>
      <button onClick={exportDataWithJsExcel}>Excel export</button>

    </div>
  );
}

export default SalesPrediction;
