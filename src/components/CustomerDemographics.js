import React, { useEffect, useState } from 'react';
import '../styles/CustomerDemographics.css';
import ajax from '../services/fetchService';


// Main React component for Music Genre Popularity
const CustomerDemographics = () => {
  const [values, setValues] = useState('');
  const [location, setLocation] = useState(''); // State for selected location
  const [genre, setGenre] = useState(''); // State for selected music genre

  // Function to handle 'Find Out' button click
  const handleFindOutClick = () => {
    ajax("http://localhost:5000/api/form6", "GET")
      .then((data) => {
        setValues(JSON.parse(data.message))
      }).catch(e => {
        console.log(e);
      });

  };

  return (
    <div className="container">
      <h1>Music Genre Popularity by Location</h1>
      <button onClick={handleFindOutClick} className="find-out-btn">Find Out</button>
      <div className="results">
        {values ? <>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Most listened genre</th>
              </tr>
            </thead>
            <tbody>
              {values.map((value) => (
                <tr>
                  <td>{value.city}</td>
                  <td>{value.genre_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </> : <>
        </>}
      </div>
    </div>
  );
};

export default CustomerDemographics;



