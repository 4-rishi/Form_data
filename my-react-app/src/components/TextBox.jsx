// src/components/TextBox.jsx
import React from 'react';
import './TextBox.css';

const TextBox = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="textbox-container">
      <label>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
};

export default TextBox;
