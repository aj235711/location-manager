import React, { useState, useEffect } from 'react';

const App = () => {
  const [accelerometerData, setAccelerometerData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleAccelerometer);
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handleLocation);
    }

    return () => {
      window.removeEventListener('devicemotion', handleAccelerometer);
    };
  }, []);

  const handleAccelerometer = (event) => {
    const { acceleration, rotationRate } = event;
    setAccelerometerData({ acceleration, rotationRate });
  };

  const handleLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setLocationData({ latitude, longitude });
  };

  return (
    <div>
      <h1>Sensor Data</h1>

      <div>
        <h2>Accelerometer Data</h2>
        {accelerometerData && (
          <ul>
            <li>Acceleration X: {accelerometerData.acceleration.x}</li>
            <li>Acceleration Y: {accelerometerData.acceleration.y}</li>
            <li>Acceleration Z: {accelerometerData.acceleration.z}</li>
            <li>Rotation Rate Alpha: {accelerometerData.rotationRate.alpha}</li>
            <li>Rotation Rate Beta: {accelerometerData.rotationRate.beta}</li>
            <li>Rotation Rate Gamma: {accelerometerData.rotationRate.gamma}</li>
          </ul>
        )}
      </div>

      <div>
        <h2>Location Data</h2>
        {locationData && (
          <ul>
            <li>Latitude: {locationData.latitude}</li>
            <li>Longitude: {locationData.longitude}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
