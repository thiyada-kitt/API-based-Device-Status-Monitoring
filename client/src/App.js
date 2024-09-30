// src/App.js
import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  return (
    <div className="App">
      <header>
        <h1>API-based Device Status Monitoring</h1>
        <p>ระบบตรวจสอบสถานะเซิร์ฟเวอร์</p>
      </header>
      <Dashboard 
        isMonitoring={isMonitoring} 
        startMonitoring={startMonitoring} 
        stopMonitoring={stopMonitoring} 
      />
      <footer>
        <p>© 2024 HWAPI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
