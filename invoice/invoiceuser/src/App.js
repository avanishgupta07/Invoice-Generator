import React from 'react';
import './App.css'; // Import the CSS file
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <InvoiceForm />
    </div>
  );
}

export default App;
