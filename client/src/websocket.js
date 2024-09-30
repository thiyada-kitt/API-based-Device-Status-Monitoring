let websocket = null;

export const startMonitoring = (setStatus) => {
  websocket = new WebSocket('ws://localhost:8000/ws/monitor');

  websocket.onopen = () => {
    console.log('WebSocket connection established.');
  };

  websocket.onmessage = (event) => {
    const status = JSON.parse(event.data);
    console.log(status);
    setStatus(status);
  };

  websocket.onclose = () => {
    console.log('WebSocket connection closed.');
    setTimeout(() => startMonitoring(setStatus), 5000); // Reconnect ทุก ๆ 5 วินาที
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const stopMonitoring = () => {
  if (websocket) {
    websocket.close();
  }
};