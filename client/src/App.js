import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = (setStatus) => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  return (
    <div className="App">
      <header>
        <h1>API-based Device Status Monitoring</h1>
        <p>ระบบตรวจสอบสถานะ</p>
      </header>
      <Dashboard 
        isMonitoring={isMonitoring}
        startMonitoring={startMonitoring}
        stopMonitoring={stopMonitoring}
      />
      <footer>
        <p>© 2024 HWAPI. No all rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
