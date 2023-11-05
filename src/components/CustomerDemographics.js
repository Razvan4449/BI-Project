import React, { useState } from 'react';
import '../styles/CustomerDemographics.css';


// Main React component for Music Genre Popularity
const CustomerDemographics = () => {
    const [location, setLocation] = useState(''); // State for selected location
    const [genre, setGenre] = useState(''); // State for selected music genre
    const [data] = useState(null); // State to hold the data for graph and numbers
  
    // Function to handle 'Find Out' button click
    const handleFindOutClick = () => {
      // Placeholder for calculation or data fetching logic
      console.log('Calculations run for location:', location, 'and genre:', genre);
      // Update the data state with result here
    };
  
    return (
        <div className="container">
          <h1>Music Genre Popularity by Location</h1>
          <div className="selectors">
            <label htmlFor="location-select" className="dropdown-label">Location:</label>
            <select
              id="location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="dropdown"
            >
              {/* Options for locations */}
            </select>
            
            <label htmlFor="genre-select" className="dropdown-label">Genre:</label>
            <select
              id="genre-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="dropdown"
            >
              {/* Options for music genres */}
            </select>
          </div>
          <button onClick={handleFindOutClick} className="find-out-btn">Find Out</button>
          <div className="results">
            {/* Placeholder for graph component */}
            <div className="graph"></div>
            {/* Placeholder for displaying data as numbers */}
            {data && <div className="data">{/* Render data here */}</div>}
          </div>
        </div>
      );
  };

export default CustomerDemographics;



