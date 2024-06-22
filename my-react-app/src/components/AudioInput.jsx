// src/components/AudioInput.jsx
import React from 'react';
import './AudioInput.css';

const AudioInput = ({ label, onChange }) => {
  return (
    <div className="audioinput-container">
      <label>{label}</label>
      <input type="file" accept="audio/*" onChange={(e) => onChange(e.target.files[0])} />
    </div>
  );
};

export default AudioInput;
