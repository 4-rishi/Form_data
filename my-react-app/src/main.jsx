// src/main.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './data.json';
import './index.css';

const Main = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(data);
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <React.StrictMode>
      <App data={formData} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
