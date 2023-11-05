import React from 'react';
import '../styles/SupplyManagement.css';

// Main component for the Supply Management layout
function SupplyManagement() {
  return (
    <div className="supply-management">
      <div className="header">Supply</div>
      <div className="content">
        {/* Product blocks */}
        <div className="product-block">
          <div className="product cd" />
          <button>Show MPEG audio file</button>
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
