// src/components/VideoInput.jsx
import React from 'react';
import './VideoInput.css';

const VideoInput = ({ label, onChange }) => {
  return (
    <div className="videoinput-container">
      <label>{label}</label>
      <input type="file" accept="video/*" onChange={(e) => onChange(e.target.files[0])} />
    </div>
  );
};

export default VideoInput;
