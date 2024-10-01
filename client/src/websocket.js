let websocket = null;

export const startMonitoring = (setStatus) => {
  // ตรวจสอบว่ามีการเชื่อมต่ออยู่แล้วหรือไม่
  if (!websocket || websocket.readyState === WebSocket.CLOSED) {
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
      // ลองเชื่อมต่อใหม่ใน 5 วินาทีถ้าเชื่อมต่อถูกปิด
      setTimeout(() => startMonitoring(setStatus), 5000);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
};

export const stopMonitoring = () => {
  if (websocket) {
    websocket.close();
    websocket = null; // รีเซ็ต websocket หลังจากปิด
  }
};
