import React, { useEffect, useState } from 'react';

function App() {
  const [cpuUsage, setCpuUsage] = useState('--');
  const [memoryUsage, setMemoryUsage] = useState('--');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCpuUsage(data.cpu);
      setMemoryUsage(data.memory);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1>Real-Time System Dashboard</h1>
      <div style={styles.card}>
        <p><strong>CPU Usage:</strong> {cpuUsage}%</p>
        <p><strong>Memory Usage:</strong> {memoryUsage} GB</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '50px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  }
};

export default App;
