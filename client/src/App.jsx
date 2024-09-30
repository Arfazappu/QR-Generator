import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import QrDataComponent from './QrDataComp';
import QrGenerator from './QrGenerator';
import QrVerifyComponent from './QrVerify';

const App = () => {
  // const [view, setView] = useState('generator');

  return (
    <Router>
      <div className="App">
        {/* <h1 className="app-title">QR Code Generator for Certificate</h1> */}
        {/* <Navbar setView={setView} /> */}

        <Routes>
          <Route path="/" element={<QrGenerator />} />
          {/* <Route path="/verify" element={<QrVerifyComponent />} /> */}
          <Route path='/qr/:qrId' element={<QrDataComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
