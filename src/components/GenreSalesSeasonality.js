import React, { useEffect, useState } from 'react';
import '../styles/GenreSalesSeasonality.css';
import ajax from '../services/fetchService';
import Chart from "chart.js/auto";

const GenreSalesSeasonality = () => {
  const [salesValues6, setSalesValues6] = useState('');
  const [musicGenre, setMusicGenre] = useState('');
  const [season, setSeason] = useState('');

  useEffect(() => {
    ajax("http://localhost:5000/api/form7", "GET")
      .then((data) => {
        setSalesValues6(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });
  }, [])

  function showData6() {
    var container = document.getElementById("canvas-container")
    var chart = document.getElementById("chart6")
    container.removeChild(chart)

    var ctx = document.createElement("canvas")
    ctx.setAttribute("id", "chart6")

    container.appendChild(ctx)

    //const ctx = document.getElementById('chart6');

    let years = [];
    let values = [];

    for (let i = 0; i < salesValues6.length; i++) {
      //console.log(salesValues6[i].genre_name + "==" + musicGenre)

      if (salesValues6[i].genre_name === musicGenre && salesValues6[i].season === season) {
        years.push(salesValues6[i].sales_year)
        values.push(salesValues6[i].total_sales)
      }

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



  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form data upon submission
  };

  return (
    <div className="genre-sales-seasonality">
      <h1>Evaluating Sales Seasonality in Music Genres</h1>
      <form onSubmit={handleSubmit}>
        <div id="canvas-container">
          <canvas id="chart6"></canvas>
        </div>
        <label htmlFor="genre-select">Choose a music genre:</label>
        <select id="genre-select" name="genre" onChange={(event) => { setMusicGenre(event.target.value) }}>
          <option>--Please choose an option--</option>
          <option value="Rock">Rock</option>
          <option value="Soundtrack">Soundtrack</option>
          <option value="Bossa Nova">Bossa Nova</option>
          <option value="Easy Listening">Easy Listening</option>
          <option value="R&B/Soul">R&B/Soul</option>
          <option value="Electronica/Dance">Electronica/Dance</option>
          <option value="World">World</option>
          <option value="Hip Hop/Rap">Hip Hop/Rap</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="TV Shows">TV Shows</option>
          <option value="Jazz">Jazz</option>
          <option value="Sci Fi & Fantasy">Sci Fi & Fantasy</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Alternative">Alternative</option>
          <option value="Classical">Classical</option>
          <option value="Opera">Opera</option>
          <option value="Metal">Metal</option>
          <option value="Alternative & Punk">Alternative & Punk</option>
          <option value="Rock And Roll">Rock And Roll</option>
          <option value="Blues">Blues</option>
          <option value="Latin">Latin</option>
          <option value="Reggae">Reggae</option>
          <option value="Pop">Pop</option>
        </select>

        <label htmlFor="season-select">Select a season:</label>
        <select id="season-select" name="season" onChange={(event) => { setSeason(event.target.value) }}>
          <option>--Please choose an option--</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
        </select>

        <button type="submit" onClick={showData6}>Evaluate Sales</button>
      </form>
    </div>
  );
};

export default GenreSalesSeasonality;
