import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CustomerDemographics from './components/CustomerDemographics';
import PromotionsImpact from './components/PromotionsImpact';
import SalesEvolution from './components/SalesEvolution';
import SalesPrediction from './components/SalesPrediction';
import SupplyManagement from './components/SupplyManagement';
import GenreSalesSeasonality from './components/GenreSalesSeasonality';

import './App.css';

// Main App component with routing logic based on state
function App() {
  const [page, setPage] = useState('HomePage');

  // Function to handle page change
  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  // Function to render the selected page component
  const renderPage = () => {
    switch (page) {
      case 'CustomerDemographics':
        return <CustomerDemographics />;
      case 'PromotionsImpact':
        return <PromotionsImpact />;
      case 'SalesEvolution':
        return <SalesEvolution />;
      case 'SalesPrediction':
        return <SalesPrediction />;
      case 'SupplyManagement':
        return <SupplyManagement />;
      case 'GenreSalesSeasonality':
        return <GenreSalesSeasonality />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Store Decision Support</h1>
        {/* Dropdown for page selection */}
        <select value={page} onChange={handlePageChange} className="page-select">
          <option value="HomePage">Home</option>
          <option value="CustomerDemographics">Customer Demographics</option>
          <option value="PromotionsImpact">Promotions Impact</option>
          <option value="SalesEvolution">Sales Evolution</option>
          <option value="SalesPrediction">Sales Prediction</option>
          <option value="SupplyManagement">Supply Management</option>
          <option value="GenreSalesSeasonality">GenreSalesSeasonality</option>
        </select>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
