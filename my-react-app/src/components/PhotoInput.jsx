// src/components/PhotoInput.jsx
import React from 'react';
import './PhotoInput.css';

const PhotoInput = ({ label, onChange }) => {
  return (
    <div className="photoinput-container">
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files[0])} />
    </div>
  );
};

export default PhotoInput;
