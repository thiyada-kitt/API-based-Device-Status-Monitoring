import React, { useEffect, useState, useCallback } from 'react';
import { startMonitoring, stopMonitoring } from './websocket';

const Dashboard = () => {
  const [status, setStatus] = useState({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  const start = useCallback(() => {
    startMonitoring(setStatus);
    setIsMonitoring(true);
  }, []);

  const stop = useCallback(() => {
    stopMonitoring();
    setIsMonitoring(false);
    setStatus({});
  }, []);

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, [start, stop]);

  return (
    <div>
      {status ? (
        <div style={{ textAlign: 'center' }}>
          <h1>
            Status:
            <span style={{ color: status.status?.online ? 'green' : 'red' }}>
              {status.status?.online ? ' Online' : ' Offline'}
           </span>
          </h1>
          <p>Timestamp: {status.status?.timestamp}</p>

          <h2>System Info:</h2>
          <p>CPU Usage: {status.system?.cpu?.usage ?? 'N/A'}%</p>
          <p>RAM Usage: {status.system?.ram?.usage ?? 'N/A'}%</p>
          <p>Disk Usage: {status.system?.disk?.usage ?? 'N/A'}%</p>

          <h2>Network:</h2>
          <p>Bytes Sent: {status.network?.bytes_sent ?? 'N/A'}</p>
          <p>Bytes Received: {status.network?.bytes_recv ?? 'N/A'}</p>

          <h2>Disk I/O:</h2>
          <p>Read Count: {status.disk_io?.read_count ?? 'N/A'}</p>
          <p>Write Count: {status.disk_io?.write_count ?? 'N/A'}</p>

          {/* <h2>Internet Speed:</h2>
          <p>Download Speed: {status.internet?.speed?.download_mbps ?? 'N/A'} Mbps</p>
          <p>Upload Speed: {status.internet?.speed?.upload_mbps ?? 'N/A'} Mbps</p> */}
        </div>
      ) : null}
      <button onClick={isMonitoring ? stop : start}
       style={{ 
        backgroundColor: isMonitoring ? 'red' : 'green', 
        color: 'white', 
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        {isMonitoring ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Dashboard;
